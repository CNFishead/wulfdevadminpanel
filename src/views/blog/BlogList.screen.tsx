import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useGetBlogData from '@/state/blog/useGetBlogData';
import React from 'react';
import styles from './BlogList.module.scss';
import { Button, Table, Skeleton, Modal } from 'antd';
import Error from '@/components/error/Error.component';
import { BsPlus, BsTrash2Fill } from 'react-icons/bs';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useRemoveBlog from '@/state/blog/useRemoveBlog';

const BlogList = () => {
  const { data, isLoading, isError, error, isFetching } = useGetBlogData();
  const { mutate: deleteBlog } = useRemoveBlog();
  if (isLoading) return <Skeleton active />;
  if (isError) return <Error error={error} />;

  return (
    <>
      <div className={styles.container}>
        <SearchWrapper
          buttons={[
            {
              icon: <BsPlus />,
              onClick: () => {},
              href: '/professional_oddysey/blog/new',
              type: 'primary',
              toolTip: 'Create a new blog',
            },
          ]}
          filters={[
            {
              key: '',
              label: 'All Blogs',
            },
            {
              key: 'isFeatured;true',
              label: 'Featured',
            },
            {
              key: 'isFeatured;false',
              label: 'Not Featured',
            },
            {
              key: 'isPrivate;true',
              label: 'Private',
            },
            {
              key: 'isPrivate;false',
              label: 'Public',
            },
          ]}
          sort={[
            {
              key: '',
              label: 'Default',
            },
            {
              key: 'createdAt;-1',
              label: 'Newest',
            },
            {
              key: 'createdAt;1',
              label: 'Oldest',
            },
            {
              key: 'blogTitle;-1',
              label: 'Project Name (Z-A)',
            },
            {
              key: 'blogTitle;1',
              label: 'Project Name (A-Z)',
            },
            {
              key: 'viewsCount;-1',
              label: 'Most Views',
            },
            {
              key: 'viewsCount;1',
              label: 'Least Views',
            },
            {
              key: 'commentsCount;-1',
              label: 'Most Comments',
            },
            {
              key: 'commentsCount;1',
              label: 'Least Comments',
            },
            {
              key: 'likesCount;-1',
              label: 'Most Likes',
            },
            {
              key: 'likesCount;1',
              label: 'Least Likes',
            },
          ]}
          placeholder="Search Blogs"
          total={data?.totalCount}
          queryKey="featuredBlogs"
          disableButtons={isFetching}
          isFetching={isFetching}
        >
          {isFetching && <NProgressLoader />}

          <Table
            size="small"
            columns={[
              {
                title: 'Blog Title',
                dataIndex: 'blogTitle',
                key: 'name',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                render: (text: any, record: any) => {
                  // cut it off at 100 characters
                  const cutOff = 100;
                  const description = record.description;
                  const shortDescription = description.substring(0, cutOff);
                  const isShortDescription = description.length > cutOff;
                  return (
                    <div>
                      {shortDescription}
                      {isShortDescription && '...'}
                    </div>
                  );
                },
              },
              {
                title: 'Published Blog',
                dataIndex: 'isPublished',
                key: 'isPublished',
                render: (text: any, record: any) => {
                  return (
                    <div>
                      {record.isFeatured ? (
                        <span style={{ color: 'green' }}>
                          <FaCheckCircle />
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          <FaTimesCircle />
                        </span>
                      )}
                    </div>
                  );
                },
              },
              {
                title: 'Private Blog',
                dataIndex: 'isPrivate',
                key: 'isPrivate',
                render: (text: any, record: any) => {
                  return (
                    <div>
                      {record?.isPrivate ? (
                        <span style={{ color: 'green' }}>
                          <FaCheckCircle />
                        </span>
                      ) : (
                        <span style={{ color: 'red' }}>
                          <FaTimesCircle />
                        </span>
                      )}
                    </div>
                  );
                },
              },
              {
                title: 'Views',
                dataIndex: 'viewsCount',
                key: 'views',
              },
              {
                title: 'Comments',
                dataIndex: 'commentsCount',
                key: 'comments',
              },
              {
                title: 'Actions',
                dataIndex: 'actions',
                key: 'actions',
                render: (text: any, record: any) => {
                  return (
                    <div
                      style={{ display: 'flex', width: '100%', gap: '10px' }}
                    >
                      {/* render a next/link as a button */}
                      <Link href={`/professional_oddysey/blog/${record._id}`}>
                        <Button type="primary">Edit</Button>
                      </Link>

                      <Button
                        onClick={() =>
                          Modal.confirm({
                            title:
                              'Are you sure you want to delete this work history?',
                            content: 'This action cannot be undone',
                            okText: 'Delete',
                            okButtonProps: { danger: true },
                            onOk: () => {
                              deleteBlog(record._id);
                              Modal.destroyAll();
                            },
                          })
                        }
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <BsTrash2Fill /> Delete
                      </Button>
                    </div>
                  );
                },
              },
            ]}
            dataSource={data?.blogs}
            rowKey="_id"
            pagination={false}
          />
        </SearchWrapper>
      </div>
    </>
  );
};

export default BlogList;
