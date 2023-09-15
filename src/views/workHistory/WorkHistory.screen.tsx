import React from 'react';
import styles from './WorkHistory.module.scss';
import { Table } from 'antd';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import uesGetWorkHistory from '@/state/workhistory/uesGetWorkHistory';
import { BsPlus } from 'react-icons/bs';

const WorkHistory = () => {
  const { data, isFetching } = uesGetWorkHistory();
  return (
    <div className={styles.container}>
      <SearchWrapper
        buttons={[{
          icon: <BsPlus />,
          onClick: () => console.log('clicked'),
          type: 'primary',
          toolTip: 'Add Work History',
        }]}
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
