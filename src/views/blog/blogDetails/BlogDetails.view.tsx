import React from 'react';
import styles from './BlogDetails.module.scss';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';
import { useRouter } from 'next/router';
import CopyField from '@/components/copyField/CopyField.component';
import { Form, Skeleton, Row, Button, Tabs, Input } from 'antd';
import Error from '@/components/error/Error.component';
import dayjs from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import useUpdateBlog from '@/state/blog/useUpdateBlog';
import useCreateBlog from '@/state/blog/useCreateBlog';
import ContentContainer from './content/ContentContainer.view';
import capitalizeWords from '@/utils/capitalizeWords';
import MetaDetails from './metaDetails/MetaDetails.view';
import CoverPhotoContainer from './coverPhoto/CoverPhotoContainer.view';
import { set } from 'nprogress';

const BlogDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: blogDetails,
    isLoading,
    isError,
    error,
  } = useGetBlogDetails({
    id: id as string,
  });
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
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
  const [views, setViews] = React.useState([
    {
      name: 'meta details',
      component: (
        <MetaDetails
          form={form}
          onFinish={() => onFinish(form.getFieldsValue())}
        />
      ),
      hidden: false,
    },
    {
      name: 'Cover Photo',
      component: <CoverPhotoContainer data={blogDetails} />,
      hidden: false,
    },
    {
      name: 'content',
      component: <ContentContainer/>,
      hidden: false,
    },
  ]);
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
      form.resetFields();
      // specifically set the photo to null
    };
  }, []);
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
      <div className={styles.tabsContainer}>
        <Tabs
          defaultActiveKey={views[0].name}
          items={views.map((view) => {
            return {
              label: capitalizeWords(view.name),
              key: view.name,
              children: view.component,
            };
          })}
        />
      </div>
    </div>
  );
};

export default BlogDetails;
