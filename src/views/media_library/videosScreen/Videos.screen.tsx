import styles from './Videos.module.scss';
import React from 'react';
import { Button, Empty, Modal, Upload, UploadProps, message } from 'antd';
import SelectableItem from '@/components/selectableItem/SelectableItem.component';
import { FaCopy, FaEye, FaTrash } from 'react-icons/fa';
import useRemoveCloudinaryImage from '@/state/media/useRemoveCloudinaryImage';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import removeExtension from '@/utils/removeExtension';
import useGetCloudinaryVideos from '@/state/media/useGetCloudinaryVideos';
import { useUser } from '@/state/auth';
import { AiOutlineUpload } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';

const Videos = () => {
  const [nextCursor, setNextCursor] = React.useState<string>('');
  const prevCursors = React.useRef<string[]>([]); // Initialize as an empty array
  const queryClient = useQueryClient();
  const { mutate: deleteImage, isLoading: deleteLoading } =
    useRemoveCloudinaryImage(() => {
      queryClient.invalidateQueries(['cloudinaryVideos']);
    });
  const { data: cloudinaryData, isLoading: cloudinaryLoading } =
    useGetCloudinaryVideos(nextCursor);
  const { data: loggedInData } = useUser();
  // Function to fetch the next page of data
  const fetchNextPage = () => {
    prevCursors.current.push(nextCursor); // Save the current nextCursor
    if (cloudinaryData?.data?.next_cursor) {
      setNextCursor(cloudinaryData?.data?.next_cursor);
    }
  };

  // Function to fetch the previous page of data
  const fetchPreviousPage = () => {
    // get the last position of the array
    const prevCursor = prevCursors.current.pop();

    if (prevCursor !== '' || prevCursor !== undefined) {
      setNextCursor(prevCursor!); // Use the previous nextCursor
    }
    // set the nextCursor to ''
    if (prevCursors.current.length === 0) {
      setNextCursor('');
    }
  };
  const props: UploadProps = {
    name: 'file',
    action:
      process.env.NODE_ENV === 'production'
        ? process.env.API_URL + '/upload/cloudinary-video'
        : 'http://localhost:5000/api/v1/upload/cloudinary-video',
    headers: {
      authorization: `Bearer ${loggedInData.user?.token}`,
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        // invalidate the query
        queryClient.invalidateQueries(['cloudinaryVideos']);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Cloudinary Videos</h1>
        {/* upload button */}
        <Upload {...props}>
          <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
        </Upload>
      </div>
      {(cloudinaryLoading || deleteLoading) && <NProgressLoader />}

      <div className={styles.paginationContainer}>
        {prevCursors?.current.length > 0 && (
          <Button onClick={fetchPreviousPage}>Prev</Button>
        )}
        {cloudinaryData?.data?.next_cursor && (
          <Button onClick={fetchNextPage}>Next</Button>
        )}
      </div>
      <div className={styles.videosContainer}>
        {cloudinaryData?.data?.resources?.length === 0 && (
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <Empty description="No videos found" />
          </div>
        )}
        {
          // @ts-ignore
          cloudinaryData?.data?.resources?.map((resource) => {
            return (
              <SelectableItem
                key={resource.asset_id}
                imageUrl={removeExtension(resource.secure_url) + '.jpg'}
                link={''}
                options={[
                  {
                    label: 'View',
                    key: '0',
                    danger: false,
                    icon: <FaEye />,
                    onClick: () => {
                      Modal.info({
                        title: 'Video Preview',
                        content: (
                          <video
                            width="100%"
                            controls
                            src={resource.secure_url}
                          ></video>
                        ),
                      });
                    },
                  },
                  {
                    label: 'Copy Link',
                    key: '2',
                    icon: <FaCopy />,
                    onClick: () => {
                      navigator.clipboard.writeText(resource.secure_url);
                      message.success('Copied to clipboard');
                    },
                  },
                  {
                    label: 'Delete',
                    key: '1',
                    danger: true,
                    icon: <FaTrash />,
                    onClick: () => {
                      Modal.confirm({
                        title: 'Are you sure you want to delete this video?',
                        content: 'This action cannot be undone.',
                        okText: 'Yes',
                        cancelText: 'No',
                        onOk: () => {
                          deleteImage({
                            id: resource.public_id,
                            resourceType: 'video',
                          });
                        },
                      });
                    },
                  },
                ]}
              >
                <></>
              </SelectableItem>
            );
          })
        }
      </div>
    </div>
  );
};

export default Videos;
