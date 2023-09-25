import React from 'react';
import {
  Form,
  Skeleton,
  Input,
  Select,
  Tooltip,
  Switch,
  Row,
  Button,
} from 'antd';
import styles from '../BlogDetails.module.scss';
import formStyles from '@/styles/Form.module.scss';
import { useRouter } from 'next/router';

interface Props {
  form: any;
  onFinish: () => void;
}
const MetaDetails = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        form={props.form}
        onFinish={props.onFinish}
        className={formStyles.form}
      >
        <div className={styles.contentContainer}>
          <div className={formStyles.editContainer}>
            <h1 className={formStyles.header}>Meta Details</h1>
            <div className={formStyles.group}>
              <Form.Item name="_id" hidden={true}>
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>
            <div className={formStyles.group}>
              <Form.Item
                name="blogTitle"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tags"
                label="Keywords or tags, for SEO"
                help="values are ( , ) seperated"
              >
                <Select
                  mode="tags"
                  placeholder="Select Languages"
                  className={`${formStyles.input} ${formStyles.select}`}
                  tokenSeparators={[',']}
                  filterOption={(input: string, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                ></Select>
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.editContainer}>
            {/* booleans */}
            <div className={formStyles.group}>
              <Tooltip title="Published blogs will be visible to the public">
                <Form.Item
                  name="isPublished"
                  label="Published"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Tooltip>
              <Tooltip title="Featured blogs will be eligible to be displayed on the dev portfolio site">
                <Form.Item
                  name="isFeatured"
                  label="Featured Blog"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Tooltip>
              <Tooltip title="Private blogs will not be visible to the public, only you can see it">
                <Form.Item
                  name="isPrivate"
                  label="Private Blog"
                  valuePropName="checked"
                >
                  <Switch />
                </Form.Item>
              </Tooltip>
            </div>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={styles.submitButton}
            htmlType="submit"
            type="primary"
          >
            {id ? 'Update Blog' : 'Create Blog'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default MetaDetails;
