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
  DatePicker,
} from 'antd';
import styles from '../BlogDetails.module.scss';
import formStyles from '@/styles/Form.module.scss';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import useGetBlogDetails from '@/state/blog/useGetBlogDetails';
import useUpdateBlog from '@/state/blog/useUpdateBlog';
import useCreateBlog from '@/state/blog/useCreateBlog';

interface Props {}
const MetaDetails = (props: Props) => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useGetBlogDetails({
    id: id as any,
  });
  const [form] = Form.useForm();
  const { mutate: updateBlog } = useUpdateBlog();
  const { mutate: createBlog } = useCreateBlog();

  const onFinish = (values: any) => {
    if (id) {
      // update project
      updateBlog({ ...values });
    } else {
      // create project
      createBlog(values);
    }
  };

  React.useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        writtenAt: dayjs(data?.writtenAt),
      });
    }
  }, [data]);
  return (
    <div className={styles.container}>
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
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
            <div className={formStyles.group}>
              <Form.Item
                name="blogTitle"
                label="Title"
                rules={[{ required: true }]}
              >
                <Input className={formStyles.input} />
              </Form.Item>
              <Form.Item name="writtenAt" label="Date Blog was written">
                <DatePicker className={formStyles.input} allowClear={false} />
              </Form.Item>
              <Form.Item
                name="tags"
                label="Keywords or tags, for SEO"
                help="values are ( , ) seperated"
              >
                <Select
                  mode="tags"
                  placeholder="Select Languages"
                  className={`${formStyles.input}`}
                  tokenSeparators={[',']}
                  filterOption={(input: string, option: any) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                ></Select>
              </Form.Item>
            </div>
            <Form.Item name="description" label="Description">
              <Input.TextArea
                autoSize={{ minRows: 3, maxRows: 5 }}
                className={formStyles.input}
              />
            </Form.Item>
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
            // className={styles.submitButton}
            className={formStyles.button}
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
