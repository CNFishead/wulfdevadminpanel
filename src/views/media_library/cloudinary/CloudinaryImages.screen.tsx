import React from 'react';
import styles from './CloudinaryImages.module.scss';
import useGetCloudinaryImages from '@/state/media/useGetCloudinaryImages';
import { Modal, Button, Form, Upload, UploadProps, message } from 'antd';
import { FaTrash, FaUpload } from 'react-icons/fa';
import useRemoveCloudinaryImage from '@/state/media/useRemoveCloudinaryImage';
import SelectableItem from '@/components/selectableItem/SelectableItem.component';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import { AiOutlineUpload } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import { BsFillTrashFill } from 'react-icons/bs';

const CloudinaryImages = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [nextCursor, setNextCursor] = React.useState<string>('');
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [form] = Form.useForm();
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
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title={'Upload Image'}
      >
        <PhotoUpload
          form={form}
          name={'image'}
          label={'Image'}
          placeholder={'Select an image'}
          action={'/api/upload'}
          listType={'picture-card'}
          tooltip={'Upload an image'}
        />
      </Modal>

      {(cloudinaryLoading || deleteLoading) && <NProgressLoader />}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Cloudinary Images</h1>
        {/* upload button */}
            <Button
              icon={<AiOutlineUpload />}
              type="primary"
            >
              Upload
            </Button>
      </div>
      <div className={styles.paginationContainer}>
        {prevCursors?.current.length > 0 && (
          <Button onClick={fetchPreviousPage}>Prev</Button>
        )}
        {cloudinaryData?.data?.next_cursor && (
          <Button onClick={fetchNextPage}>Next</Button>
        )}
      </div>
      <div className={styles.contentContainer}>
        {
          // @ts-ignore
          cloudinaryData?.data?.resources?.map((resource) => {
            return (
              <div className={styles.imageContainer} key={resource.asset_id}>
                <SelectableItem
                  imageUrl={resource.secure_url}
                  link={''}
                  options={[
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
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default CloudinaryImages;
