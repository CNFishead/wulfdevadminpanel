import React from 'react';
import { Form, Row, Button, Input, Skeleton } from 'antd';
import TinyEditor from '@/components/tinyEditor/TinyEditor.component';
import { useRouter } from 'next/router';
import useUpdateBlog from '@/state/blog/useUpdateBlog';
import useCreateBlog from '@/state/blog/useCreateBlog';
import styles from '../BlogDetails.module.scss';
import formStyles from '@/styles/Form.module.scss';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';

interface Props {}
const ContentContainer = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: createBlog } = useCreateBlog();
  const [initialContent, setInitialContent] = React.useState<string>('');
  const {
    data: blogDetails,
    isLoading,
    isError,
    error,
  } = useGetBlogDetails({ id: id as string });
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
    if (id && blogDetails) {
      form.setFieldsValue({
        ...blogDetails,
      });
      setInitialContent(blogDetails.content);
    }
  }, [blogDetails]);

  if (id && isLoading) {
    return <Skeleton active />;
  }
  return (
    <Form form={form} onFinish={onFinish} className={formStyles.form}>
      <div className={formStyles.editContainer}>
        <h1 className={formStyles.header}>Blog Content</h1>
        <Form.Item name="_id" hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item name="content">
          {id && !isLoading && (
            <TinyEditor
              handleChange={
                // gets the value from the editor and sets it to the form
                (value: string) => form.setFieldsValue({ content: value })
              }
              initialContent={initialContent ?? ''}
            />
          )}
        </Form.Item>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={formStyles.button}
            htmlType="submit"
            type="primary"
          >
            {id ? 'Update Blog' : 'Create Blog'}
          </Button>
        </Row>
      </div>
    </Form>
  );
};

export default ContentContainer;
