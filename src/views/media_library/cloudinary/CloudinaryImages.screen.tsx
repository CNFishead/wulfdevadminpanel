import React from 'react';
import styles from './CloudinaryImages.module.scss';
import useGetCloudinaryImages from '@/state/media/useGetCloudinaryImages';
import { Modal, Button, Form, Upload, UploadProps, message } from 'antd';
import { FaCopy, FaExternalLinkAlt, FaTrash, FaUpload } from 'react-icons/fa';
import useRemoveCloudinaryImage from '@/state/media/useRemoveCloudinaryImage';
import SelectableItem from '@/components/selectableItem/SelectableItem.component';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import { AiOutlineUpload } from 'react-icons/ai';
import { useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useRouter } from 'next/router';
import { BsFillTrashFill } from 'react-icons/bs';
import ImageDetails from './components/imageDetails/ImageDetails.component';

const CloudinaryImages = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [imageUrl, setImageUrl] = React.useState<string>('');
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
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        title={'Upload Image'}
      >
        <Form form={form} onFinish={() => {}}>
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                name="photo"
                default={imageUrl}
                label=""
                form={form}
                action={
                  process.env.NODE_ENV === 'production'
                    ? `${process.env.API_URL}/upload/cloudinary`
                    : 'http://localhost:5000/api/v1/upload/cloudinary'
                }
                placeholder="Upload a Project photo"
                onFinishAction={() => {
                  queryClient.invalidateQueries(['cloudinary']);
                  setImageUrl('');
                  setShowModal(!showModal);
                }}
              />
            </div>
          </div>
        </Form>
      </Modal>

      {(cloudinaryLoading || deleteLoading) && <NProgressLoader />}
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Cloudinary Images</h1>
        {/* upload button */}
        <Button
          icon={<AiOutlineUpload />}
          type="primary"
          onClick={() => setShowModal(true)}
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
                      label: 'View Details',
                      key: '3',
                      icon: <FaExternalLinkAlt />,
                      onClick: () => {
                        Modal.info({
                          title: 'Image Details',
                          content: <ImageDetails imageDetails={resource} />,
                          // make the modal large by default
                          width: '80%',
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
