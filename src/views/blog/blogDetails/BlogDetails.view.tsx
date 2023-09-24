import React, { useEffect } from 'react';
import formStyles from '@/styles/Form.module.scss';
import styles from './BlogDetails.module.scss';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';
import { useRouter } from 'next/router';
import CopyField from '@/components/copyField/CopyField.component';
import {
  Form,
  Input,
  Skeleton,
  Select,
  Switch,
  Row,
  Tooltip,
  Button,
} from 'antd';
import Error from '@/components/error/Error.component';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import TinyEditor from '@/components/tinyEditor/TinyEditor.component';
import useUpdateBlog from '@/state/blog/useUpdateBlog';
import useCreateBlog from '@/state/blog/useCreateBlog';

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: blogDetails,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetBlogDetails({
    id: id as string,
  });
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: createBlog } = useCreateBlog();

  React.useEffect(() => {
    if (id && blogDetails) {
      form.setFieldsValue({
        ...blogDetails,
      });
      setImageUrl(blogDetails?.blogImageUrl);
    }
  }, [blogDetails]);
  React.useEffect(() => {
    // invalidate the projectDetails query when component unmounts
    return () => {
      queryClient.invalidateQueries(['blogDetails']);
      queryClient.resetQueries(['blogDetails']);
      form.resetFields();
      // specifically set the photo to null
      setImageUrl('');
    };
  }, []);

  const onFinish = (values: any) => {
    if (id) {
      // update project
      updateBlog({ ...values});
    } else {
      // create project
      createBlog(values);
    }
  };

  if (id && isLoading) return <Skeleton active />;
  if (isError) return <Error error={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.blogTitleContainer}>
        <h1 className={styles.blogTitleHeader}>
          {blogDetails?.blogTitle
            ? `Blog - ${blogDetails?.blogTitle}`
            : 'Create a new blog'}
        </h1>
        {blogDetails && (
          <p className={styles.blogTitle}>
            <span className={styles.blogId}>
              <CopyField data={blogDetails?._id} />
            </span>
          </p>
        )}
      </div>
      <Row>
        {/* display the number of views/comments */}
        <div className={styles.blogDetails}>
          <p>
            <span className={styles.blogDetailsLabel}>Views:</span>{' '}
            {blogDetails?.viewsCount ?? 0}
          </p>
          <p>
            <span className={styles.blogDetailsLabel}>Comments:</span>{' '}
            {blogDetails?.commentsCount ?? 0}
          </p>
          <p>
            <span className={styles.blogDetailsLabel}>Published:</span>{' '}
            {dayjs(blogDetails?.publishedAt).format('DD/MM/YYYY')}
          </p>
          <p>
            <span className={styles.blogDetailsLabel}>Last Updated:</span>{' '}
            {dayjs(blogDetails?.updatedAt).format('DD/MM/YYYY')}
          </p>
        </div>
      </Row>
      <Form
        layout="vertical"
        form={form}
        onFinish={() => {
          form.validateFields().then((values) => {
            onFinish(values);
          });
        }}
        className={formStyles.form}
      >
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <Form.Item name="_id" hidden={true}>
              <Input />
            </Form.Item>
            <div className={styles.imageUploadContainer}>
              <div className={styles.imageContainer}>
                <PhotoUpload
                  name="blogImageUrl"
                  default={form.getFieldsValue().blogImageUrl}
                  value={imageUrl}
                  label=" "
                  form={form}
                  action={
                    process.env.NODE_ENV === 'production'
                      ? `${process.env.API_URL}/upload/cloudinary`
                      : 'http://localhost:5000/api/v1/upload/cloudinary'
                  }
                  placeholder="Upload a Cover photo"
                />
              </div>
            </div>
            <div className={formStyles.editContainer}>
              <div className={formStyles.group}>
                <Form.Item
                  name="blogImageUrl"
                  label="Cover Photo URL"
                  help="can use an https link, best images are png/webp"
                >
                  <Input
                    onChange={() =>
                      setImageUrl(form.getFieldsValue().blogImageUrl)
                    }
                  />
                </Form.Item>
                <Form.Item
                  name="tags"
                  label="Keywords or tags, for SEO"
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
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={formStyles.editContainer}>
              <Form.Item
                name="blogTitle"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true }]}
              >
                <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
              </Form.Item>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true }]}
              >
                <TinyEditor
                  handleChange={
                    // gets the value from the editor and sets it to the form
                    (value: string) => form.setFieldsValue({ content: value })
                  }
                  initialContent={`${form.getFieldsValue().content ?? ''}`}
                />
              </Form.Item>
              {/* booleans */}
              <Row
                gutter={10}
                style={{
                  backgroundColor: 'white',
                  padding: '2%',
                  borderRadius: '5px',
                  display: 'flex',
                  justifyContent: 'space-evenly',
                }}
              >
                <Tooltip title="Published blogs will be visible to the public">
                  <Form.Item
                    name="isPublished"
                    label="Published"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Featured blogs will be eligible to be displayed on the dev portfolio site">
                  <Form.Item
                    name="isFeatured"
                    label="Featured Blog"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Tooltip>
                <Tooltip title="Private blogs will not be visible to the public, only you can see it">
                  <Form.Item
                    name="isPrivate"
                    label="Private Blog"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Tooltip>
              </Row>
            </div>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={styles.submitButton}
            htmlType="submit"
            type="primary"
          >
            {id ? 'Update Blog' : 'Create Blog'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default BlogDetails;
