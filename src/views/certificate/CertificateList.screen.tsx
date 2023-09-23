import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import useGetBlogData from '@/state/blog/useGetBlogData';
import React from 'react';
import styles from './CertificateList.module.scss';
import { Button, Table, Skeleton, Modal } from 'antd';
import Error from '@/components/error/Error.component';
import { BsPlus, BsTrash2Fill } from 'react-icons/bs';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import Link from 'next/link';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import useGetCertificates from '@/state/certificate/useGetCertificates';
import moment from 'moment';
import useRemoveCertificate from '@/state/certificate/useRemoveCertificate';

const CertificateList = () => {
  const { data, isLoading, isError, error, isFetching } = useGetCertificates();
  const { mutate: deleteCertificate } = useRemoveCertificate();
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
              href: '/professional_oddysey/certificates/new',
              type: 'primary',
              toolTip: 'Create a new blog',
            },
          ]}
          filters={[
            {
              key: '',
              label: 'All Certificates',
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
            // make every other row a different color
            rowClassName={(record, index) =>
              index % 2 === 0 ? styles.tableRowOdd : styles.tableRowEven
            }
            columns={[
              {
                title: 'Certificate Title',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Certificate Issuer',
                dataIndex: 'issuingAuthority',
              },
              {
                title: 'Date Issued',
                dataIndex: 'dateOfCompletion',
                key: 'dateOfCompletion',
                render: (text: any, record: any) => {
                  return moment(record.dateOfCompletion).format('LL');
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
                        href={`/professional_oddysey/certificates/${record._id}`}
                      >
                        <Button type="primary">Edit</Button>
                      </Link>

                      <Button
                        onClick={() =>
                          Modal.confirm({
                            title: `Are you sure you want to delete "${record.name}"?`,
                            content: 'This action cannot be undone',
                            okText: 'Delete',
                            okButtonProps: { danger: true },
                            onOk: () => {
                              deleteCertificate(record._id);
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
            dataSource={data?.certificates}
            rowKey="_id"
            pagination={false}
          />
        </SearchWrapper>
      </div>
    </>
  );
};

export default CertificateList;
