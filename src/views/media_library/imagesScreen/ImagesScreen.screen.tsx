import useGetCloudinaryImages from '@/state/media/useGetCloudinaryImages';
import styles from './ImagesScreen.module.scss';
import React from 'react';
import { Image } from 'antd';

const ImagesScreen = () => {
  const { data: cloudinaryData, isLoading: cloudinaryLoading } =
    useGetCloudinaryImages();
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
              <div className={styles.videoContainer}>
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
    </div>
  );
};

export default ImagesScreen;
