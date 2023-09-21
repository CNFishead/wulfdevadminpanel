import React from 'react';
import styles from './ImageDetails.module.scss';
import { Image, Form, Input, Button } from 'antd';
import CopyField from '@/components/copyField/CopyField.component';
import { FaCopy } from 'react-icons/fa';
import formatBytes from '@/utils/formatBytes';

interface Props {
  imageDetails: any;
}
const ImageDetails = (props: Props) => {
  const { imageDetails } = props;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Form layout="vertical">
          <div className={styles.sizeContainer}>
            <div className={styles.size}>
              <span>Width:</span> {imageDetails.width}px
            </div>
            <div className={styles.size}>
              <span>Height:</span> {imageDetails.height}px
            </div>
          </div>

          <Image src={imageDetails.secure_url} alt={imageDetails.public_id} />
          <div className={styles.copyContainer}>
            <Form.Item label="Secure Url" className={styles.inputContainer}>
              <Input
                type="text"
                id="secure_url"
                value={imageDetails.secure_url}
                className={styles.input}
                disabled
              />
            </Form.Item>
            <div className={styles.copyButton}>
              <Button
                type="primary"
                onClick={() => {
                  navigator.clipboard.writeText(imageDetails.secure_url);
                }}
              >
                <FaCopy />
              </Button>
            </div>
          </div>
        </Form>
      </div>
      <div className={styles.detailsContainer}>
        <Form layout="vertical">
          <Form.Item label="Public Id" className={styles.inputContainer}>
            <Input
              type="text"
              id="public_id"
              value={imageDetails.public_id}
              className={styles.input}
              disabled
            />
          </Form.Item>

          <Form.Item label="Format" className={styles.inputContainer}>
            <Input
              type="text"
              id="format"
              value={imageDetails.format}
              className={styles.input}
              disabled
            />
          </Form.Item>
          <Form.Item label="Resource Type" className={styles.inputContainer}>
            <Input
              type="text"
              id="resource_type"
              value={imageDetails.resource_type}
              className={styles.input}
              disabled
            />
          </Form.Item>
          <Form.Item label="Size" className={styles.inputContainer}>
            <Input
              type="text"
              id="size"
              value={formatBytes(imageDetails.bytes)}
              className={styles.input}
              disabled
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ImageDetails;
