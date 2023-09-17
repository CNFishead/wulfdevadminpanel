import React from 'react';
import styles from './Projects.module.scss';
import { Button, Table, Form } from 'antd';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import uesGetWorkHistory from '@/state/workhistory/uesGetWorkHistory';
import { BsPlus, BsTrash2Fill } from 'react-icons/bs';
import Link from 'next/link';
import { Modal } from 'antd/lib';
// import CreateNewExperience from './modals/CreateNewExperience.modal';
import { usePostWorkHistory } from '@/state/workhistory/usePostWorkHistory';
import useRemoveWorkHistory from '@/state/workhistory/useRemoveWorkHistory';
import useGetFeaturedProjects from '@/state/portfolio/useGetFeaturedProjects';

const Projects = () => {
  const { mutate: postWorkHistory } = usePostWorkHistory();
  const { mutate: deleteWorkHistory } = useRemoveWorkHistory();
  const [form] = Form.useForm();
  const { data, isFetching } = useGetFeaturedProjects();
  const [inputValues, setInputValues] = React.useState(['']); // Initial input value

  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            icon: <BsPlus />,
            onClick: () =>
              Modal.confirm({
                title: 'Add New Project',
                content: <></>,
                // remove ok button
                okButtonProps: { style: { display: 'none' } },
                onCancel: () => {
                  form.resetFields();
                  Modal.destroyAll();
                },
              }),

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
        sort={[]}
        placeholder="Search Projects"
        total={data?.totalCount}
        queryKey="videoList"
        disableButtons={isFetching}
        isFetching={isFetching}
      >
        <Table
          columns={[
            {
              title: 'Project Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text: any, record: any) => {
                return (
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    {/* render a next/link as a button */}
                    <Link href={`/professional_oddysey/projects/${record._id}`}>
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
                            deleteWorkHistory(record._id);
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
  );
};

export default Projects;
