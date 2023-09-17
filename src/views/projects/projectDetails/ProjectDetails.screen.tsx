import useGetProjectDetails from '@/state/portfolio/useGetProjectDetails';
import { Form, Input } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import styles from './ProjectDetails.module.scss';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';

const ProjectDetails = () => {
  // get the project id from the url
  // fetch the project details from the api
  // render the project details
  const router = useRouter();
  const { id } = router.query;
  const { data: projectDetails, isFetching } = useGetProjectDetails({
    id: id as any,
  });
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (projectDetails?.project) {
      form.setFieldsValue(projectDetails.project);
    }
  }, [id]);

  const onFinish = (values: any) => {
    if (id) {
      // update project
    } else {
      // create project
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.projectTitleContainer}>
        <h1 className={styles.projectTitleHeader}>Project Details</h1>
        <p className={styles.projectTitle}>
          {projectDetails?.project?.name} - {projectDetails?.project?._id}
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        name="projectDetails"
        onFinish={() => {}}
      >
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.imageUploadContainer}>
              <div className={styles.imageContainer}>
                <PhotoUpload
                  name="photo"
                  listType="picture-card"
                  // isAvatar={true}
                  form={form}
                  action={`${process.env.API_URL}/upload`}
                  default={form.getFieldsValue().photo}
                  placeholder="Upload a Project photo"
                />
              </div>
            </div>
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
              <Input />
            </Form.Item>
            <Form.Item name="url" label="URL" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="isFeatured"
              label="Featured"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="image" label="Image" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ProjectDetails;
