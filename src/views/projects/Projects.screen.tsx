import React from 'react';
import styles from './Projects.module.scss';
import { Button, Table, Form, Skeleton } from 'antd';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { BsPlus, BsTrash2Fill } from 'react-icons/bs';
import Link from 'next/link';
import { Modal } from 'antd/lib';
import useRemoveWorkHistory from '@/state/workhistory/useRemoveWorkHistory';
import useGetFeaturedProjects from '@/state/portfolio/useGetFeaturedProjects';
import useRemoveProject from '@/state/portfolio/useRemoveProject';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import Error from '@/components/error/Error.component';
import {
  FaCheck,
  FaCheckCircle,
  FaGithub,
  FaTimesCircle,
} from 'react-icons/fa';
import { LiaExternalLinkAltSolid } from 'react-icons/lia';

const Projects = () => {
  const { mutate: deleteProject } = useRemoveProject();
  const [form] = Form.useForm();
  const { data, isFetching, isLoading, isError, error } =
    useGetFeaturedProjects();

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
              href: '/professional_oddysey/projects/new',
              type: 'primary',
              toolTip: 'Add Project',
            },
          ]}
          filters={[
            {
              key: '',
              label: 'All Projects',
            },
            {
              key: 'isFeatured;true',
              label: 'Featured',
            },
            {
              key: 'isFeatured;false',
              label: 'Not Featured',
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
              key: 'name;-1',
              label: 'Project Name (Z-A)',
            },
            {
              key: 'name;1',
              label: 'Project Name (A-Z)',
            },
          ]}
          placeholder="Search Projects"
          total={data?.totalCount}
          queryKey="portfolio"
          disableButtons={isFetching}
          isFetching={isFetching}
        >
          {isFetching && <NProgressLoader />}

          <Table
            columns={[
              {
                title: 'Project Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Featured Project',
                dataIndex: 'isFeatured',
                key: 'isFeatured',
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
                title: "Project URL's",
                // need to target both liveProjectURL and githubUrl
                dataIndex: ['liveProjectURL', 'githubUrl'],
                key: 'urls',
                // render buttons for each url
                render: (text: any, record: any) => {
                  return (
                    <div
                      style={{ display: 'flex', width: '100%', gap: '10px' }}
                    >
                      {
                        // if liveProjectURL exists, render a button
                        record.liveProjectURL && (
                          <Button type="default" href={record.liveProjectURL}>
                            <LiaExternalLinkAltSolid />
                          </Button>
                        )
                      }
                      {/* if githubUrl exists, render a button */}
                      {record.githubUrl && (
                        <Button type="default" href={record.githubUrl}>
                          <FaGithub />
                        </Button>
                      )}
                    </div>
                  );
                },
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
                      <Link
                        href={`/professional_oddysey/projects/${record._id}`}
                      >
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
                              deleteProject(record._id);
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
            dataSource={data?.projects}
            rowKey="_id"
            pagination={false}
          />
        </SearchWrapper>
      </div>
    </>
  );
};

export default Projects;
