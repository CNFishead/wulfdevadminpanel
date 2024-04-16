import useGetCloudinaryImages from '@/state/media/useGetCloudinaryImages';
import styles from './Videos.module.scss';
import React from 'react';
import { Button, Modal } from 'antd';
import Link from 'next/link';
import SelectableItem from '@/components/selectableItem/SelectableItem.component';
import { FaEye, FaTrash } from 'react-icons/fa';
import useRemoveCloudinaryImage from '@/state/media/useRemoveCloudinaryImage';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import removeExtension from '@/utils/removeExtension';

const Videos = () => {
  const [nextCursor, setNextCursor] = React.useState<string>('');
  const prevCursors = React.useRef<string[]>([]); // Initialize as an empty array
  const { mutate: deleteImage, isLoading: deleteLoading } =
    useRemoveCloudinaryImage();
  const { data: cloudinaryData, isLoading: cloudinaryLoading } =
    useGetCloudinaryImages(nextCursor);

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

  return (
    <div className={styles.container}>
      {(cloudinaryLoading || deleteLoading) && <NProgressLoader />}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Cloudinary Videos</h1>
        <Link href={'/media_library/cloudinary'} className={styles.seeMoreLink}>
          <Button>See All</Button>
        </Link>
      </div>
      <div className={styles.videosContainer}>
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
                          deleteImage(resource.public_id);
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
      <div className={styles.paginationContainer}>
        {prevCursors?.current.length > 0 && (
          <Button onClick={fetchPreviousPage}>Prev</Button>
        )}
        {cloudinaryData?.data?.next_cursor && (
          <Button onClick={fetchNextPage}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default Videos;
