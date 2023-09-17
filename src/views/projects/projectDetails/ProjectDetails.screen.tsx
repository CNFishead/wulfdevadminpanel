import useGetProjectDetails from '@/state/portfolio/useGetProjectDetails';
import { Form, Input, Select, Row, Col, Switch, Button } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProjectDetails.module.scss';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateProject from '@/state/portfolio/useUpdateProject';
import useCreateProject from '@/state/portfolio/useCreateProject';
import CopyField from '@/components/copyField/CopyField.component';

const ProjectDetails = () => {
  // get the project id from the url
  // fetch the project details from the api
  // render the project details
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const { data: projectDetails, isFetching } = useGetProjectDetails({
    id: id as any,
  });
  const { mutate: updateProject } = useUpdateProject();
  const { mutate: createProject } = useCreateProject();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const onFinish = (values: any) => {
    if (id) {
      // update project
      updateProject({ ...values, _id: id });
    } else {
      // create project
      createProject(values);
    }
  };
  React.useEffect(() => {
    if (id && projectDetails?.project) {
      form.setFieldsValue({
        ...projectDetails.project,
      });
      setImageUrl(projectDetails.project.photo);
    }
  }, [projectDetails?.project, projectDetails]);
  React.useEffect(() => {
    // invalidate the projectDetails query when component unmounts
    return () => {
      queryClient.invalidateQueries(['projectDetails']);
      form.resetFields();
      // specifically set the photo to null
      setImageUrl('');
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.projectTitleContainer}>
        <h1 className={styles.projectTitleHeader}>Project Details</h1>
        <p className={styles.projectTitle}>
          {projectDetails?.project?.name} -{' '}
          <span className={styles.projectId}>
            <CopyField data={projectDetails?.project?._id} />
          </span>
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          form.validateFields().then((values) => {
            onFinish(values);
          });
        }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.imageUploadContainer}>
              <div className={styles.imageContainer}>
                <PhotoUpload
                  name="photo"
                  default={imageUrl}
                  label=" "
                  form={form}
                  action={
                    // `${process.env.API_URL}/upload/cloudinary`
                    'http://localhost:5000/api/v1/upload/cloudinary'
                  }
                  placeholder="Upload a Project photo"
                />
              </div>
            </div>
            <Form.Item
              name="photo"
              label="Photo URL"
              rules={[{ required: true }]}
              help="can use an https link, best images are png/webp"
            >
              <Input />
            </Form.Item>
          </div>
          <div className={styles.rightContainer}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
            <Row gutter={10}>
              <Col span={12}>
                <Form.Item name="liveProjectURL" label="Live Project URL">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="githubUrl" label="Github URL">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="languages"
              label="Programming Languages used"
              help="values are ( , ) seperated"
            >
              <Select
                mode="tags"
                placeholder="Select Languages"
                className={styles.input}
                tokenSeparators={[',']}
                filterOption={(input: string, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            </Form.Item>
            <Row style={{ margin: '2% 0' }}>
              <Form.Item
                name="isFeatured"
                help="Featured projects will be eligible to be displayed on the dev portfolio site"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Featured"
                  unCheckedChildren="Not Featured"
                />
              </Form.Item>
            </Row>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={styles.submitButton}
            htmlType="submit"
            type="primary"
          >
            {id ? 'Update Project' : 'Create Project'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectDetails;
