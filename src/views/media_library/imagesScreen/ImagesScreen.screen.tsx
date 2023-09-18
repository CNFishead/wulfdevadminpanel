import useGetCloudinaryImages from '@/state/media/useGetCloudinaryImages';
import styles from './ImagesScreen.module.scss';
import React from 'react';
import { Button, Image, Pagination } from 'antd';

const ImagesScreen = () => {
  const [nextCursor, setNextCursor] = React.useState<string>('');
  const prevCursors = React.useRef<string[]>([]); // Initialize as an empty array

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
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Cloudinary Images</h1>
      </div>
      <div className={styles.videosContainer}>
        {
          // @ts-ignore
          cloudinaryData?.data?.resources?.map((resource) => {
            return (
              <div className={styles.videoContainer} key={resource.asset_id}>
                <div className={styles.videoTitleContainer}>
                  <h3 className={styles.videoTitle}>{resource.public_id}</h3>
                </div>
                <Image
                  src={resource.secure_url}
                  width={300}
                  height={300}
                  alt="video"
                />
              </div>
            );
          })
        }
      </div>
      <div className={styles.paginationContainer}>
        {cloudinaryData?.data?.next_cursor && (
          <Button onClick={fetchNextPage}>Next</Button>
        )}
        {prevCursors?.current.length > 0 && (
          <Button onClick={fetchPreviousPage}>Prev</Button>
        )}
      </div>
    </div>
  );
};

export default ImagesScreen;
