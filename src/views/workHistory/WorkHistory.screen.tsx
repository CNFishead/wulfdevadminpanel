import React from 'react';
import styles from './WorkHistory.module.scss';
import { Button, Table, Form } from 'antd';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import uesGetWorkHistory from '@/state/workhistory/uesGetWorkHistory';
import { BsPlus, BsTrash2Fill } from 'react-icons/bs';
import Link from 'next/link';
import { Modal } from 'antd/lib';
import CreateNewExperience from './modals/CreateNewExperience.modal';
import { usePostWorkHistory } from '@/state/workhistory/usePostWorkHistory';
import useRemoveWorkHistory from '@/state/workhistory/useRemoveWorkHistory';

const WorkHistory = () => {
  const { mutate: postWorkHistory } = usePostWorkHistory();
  const { mutate: deleteWorkHistory } = useRemoveWorkHistory();
  const [form] = Form.useForm();
  const { data, isFetching } = uesGetWorkHistory();
  const [inputValues, setInputValues] = React.useState(['']); // Initial input value

  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[
          {
            icon: <BsPlus />,
            onClick: () =>
              Modal.confirm({
                title: 'Add Work History',
                content: (
                  <CreateNewExperience
                    form={form}
                    inputValues={inputValues}
                    onSubmitHandler={(values) => {
                      postWorkHistory(values);
                      Modal.destroyAll();
                    }}
                  />
                ),
                // remove ok button
                okButtonProps: { style: { display: 'none' } },
                onCancel: () => {
                  form.resetFields();
                  Modal.destroyAll();
                },
              }),

            type: 'primary',
            toolTip: 'Add Work History',
          },
        ]}
        filters={[]}
        sort={[]}
        placeholder="Search Work History"
        total={data?.totalCount}
        queryKey="videoList"
        disableButtons={isFetching}
        isFetching={isFetching}
      >
        <Table
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Job Title',
              dataIndex: 'jobTitle',
              key: 'jobTitle',
            },
            {
              title: 'Start Date',
              dataIndex: 'startDate',
              key: 'startDate',
              render: (text: any) => {
                return new Date(text).toLocaleDateString();
              },
            },
            {
              title: 'End Date',
              dataIndex: 'endDate',
              key: 'endDate',
              render: (text: any) => {
                // if empty or null, return 'Present'
                if (!text) return 'Present';
                return new Date(text).toLocaleDateString();
              },
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text: any, record: any) => {
                return (
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    {/* render a next/link as a button */}
                    <Link href={`/admin/receipts/${record._id}`}>
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
          dataSource={data?.data}
          rowKey="_id"
          pagination={false}
        />
      </SearchWrapper>
    </div>
  );
};

export default WorkHistory;
