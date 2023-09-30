import React from 'react';
import styles from './AccountSettings.module.scss';
import formStyles from '@/styles/Form.module.scss';
import { Card, Form, Input, InputNumber, Button, Skeleton, Row } from 'antd';
import useGetMe from '@/state/useGetMe';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import Error from '@/components/error/Error.component';
import { FaSave } from 'react-icons/fa';

const AccountSettings = () => {
  const [form] = Form.useForm();

  const { data, isLoading, isError, error } = useGetMe({});

  React.useEffect(() => {
    // otherwise set form values
    form.setFieldsValue({ ...data?.user });
  }, [data?.user]);

  const onFinish = (values: any) => {
    console.log(values);
  };

  if (typeof window === 'undefined' || isLoading)
    return (
      <Card title="Account Details" className={styles.container}>
        <Skeleton active />
      </Card>
    );
  if (isError || !data?.user)
    return (
      <Error
        error={
          !data?.user
            ? 'No user object found, please try navigating away from the page and back'
            : error
        }
      />
    );
  return (
    <Card title="Account Details" className={styles.container}>
      <Form
        form={form}
        className={formStyles.form}
        onFinish={() => onFinish(form.getFieldsValue())}
      >
        <div className={formStyles.editContainer}>
          <div className={formStyles.group}>
            <div className={styles.imageUploadContainer}>
              <div className="">
                <div className={styles.imageContainer}>
                  <PhotoUpload
                    name="profileImageUrl"
                    listType="picture-card"
                    isAvatar={true}
                    form={form}
                    action={`${process.env.API_URL}/upload`}
                    default={data?.user?.profileImageUrl}
                    placeholder="Upload a profile photo"
                  />
                </div>
              </div>
              <Form.Item name="profileImageUrl">
                <Input
                  type="text"
                  placeholder="Profile Picture"
                  addonBefore="Image URL"
                  className={formStyles.input}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        {/* firstName and lastName should be on the same line */}
        <div className={formStyles.editContainer}>
          <div className={formStyles.group}>
            <Form.Item name="name">
              <Input
                type="text"
                placeholder="Name"
                addonBefore="Name"
                className={formStyles.input}
              />
            </Form.Item>
            <Form.Item name="email">
              <Input
                type="text"
                addonBefore="Email"
                className={formStyles.input}
              />
            </Form.Item>
            <Form.Item name="role">
              <Input
                type="text"
                addonBefore="Role"
                className={formStyles.input}
              />
            </Form.Item>
          </div>
          <Row justify={'center'}>
            <Button
              htmlType="submit"
              type="primary"
              className={formStyles.button}
              // loading={updateLoading}
              icon={<FaSave />}
            >
              Save
            </Button>
          </Row>
        </div>
      </Form>
    </Card>
  );
};

export default AccountSettings;
