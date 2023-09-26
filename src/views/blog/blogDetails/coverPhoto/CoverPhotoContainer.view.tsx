import React from 'react';
import formStyles from '@/styles/Form.module.scss';
import styles from '../BlogDetails.module.scss';
import { Form, Input, Row, Button } from 'antd';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';
import { useRouter } from 'next/router';
import BlogType from '@/types/BlogType';
import useUpdateBlog from '@/state/blog/useUpdateBlog';
import useCreateBlog from '@/state/blog/useCreateBlog';

interface Props {
  data?: BlogType;
}
const CoverPhotoContainer = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: createBlog } = useCreateBlog();

  const onFinish = (values: any) => {
    if (id) {
      // update project
      updateBlog({ ...values });
    } else {
      // create project
      createBlog(values);
    }
  };

  // if Data is passed in from parent set the form
  React.useEffect(() => {
    if (props.data) {
      form.setFieldsValue(props.data);
      setImageUrl(props.data.blogImageUrl);
    }
  }, [props.data]);

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onFinish} className={formStyles.form}>
        <Form.Item name="_id" hidden={true}>
          <Input />
        </Form.Item>
        <div className={formStyles.editContainer}>
          <h1 className={formStyles.header}>Cover Photo</h1>
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                name="blogImageUrl"
                default={form.getFieldsValue().blogImageUrl}
                value={imageUrl}
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
          <div className={formStyles.group}>
            <Form.Item
              name="blogImageUrl"
              label="Cover Photo URL"
              help="can use an https link, best images are png/webp"
            >
              <Input
                onChange={() => setImageUrl(form.getFieldsValue().blogImageUrl)}
                className={formStyles.input}
              />
            </Form.Item>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={formStyles.button}
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

export default CoverPhotoContainer;
