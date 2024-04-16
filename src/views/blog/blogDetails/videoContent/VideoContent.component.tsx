import React from 'react';
import styles from './VideoContent.module.scss';
import formStyles from '@/styles/Form.module.scss';
import VideoPlayer from '@/components/videoPlayer/VideoPlayer.component';
import { Button, Form, Input, Row, Skeleton } from 'antd';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';
import { useRouter } from 'next/router';
import useUpdateBlog from '@/state/blog/useUpdateBlog';

const VideoContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [form] = Form.useForm();
  const {
    data: blogDetails,
    isLoading,
    isError,
    error,
  } = useGetBlogDetails({ id: id as string });
  const [initialContent, setInitialContent] = React.useState<string>('');
  const { mutate: updateBlog } = useUpdateBlog();
  const onFinish = (values: any) => {
    updateBlog({ ...values });
  };

  // if Data is passed in from parent set the form
  React.useEffect(() => {
    if (id && blogDetails) {
      form.setFieldsValue({
        ...blogDetails,
      });
      if (blogDetails?.videoUrl) setInitialContent(blogDetails?.videoUrl);
    }
  }, [blogDetails]);

  if (id && isLoading) {
    return <Skeleton active />;
  }

  return (
    <div className={styles.container}>
      <Form form={form} onFinish={onFinish} className={formStyles.form}>
        <div className={styles.topContainer}>
          <div className={styles.videoContainer}>
            {initialContent && (
              <VideoPlayer video={{ videoUrl: initialContent }} />
            )}
          </div>
          <div className={styles.formContainer}>
            <Form.Item name="_id" hidden={true}>
              <Input />
            </Form.Item>
            <Form.Item name="videoUrl" label="Video URL">
              <Input onChange={(v) => setInitialContent(v.target.value)} />
            </Form.Item>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={formStyles.button}
            htmlType="submit"
            type="primary"
          >
            Update Blog
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default VideoContent;
