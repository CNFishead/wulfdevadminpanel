import React from 'react';
import styles from './CertificateDetails.module.scss';
import { useRouter } from 'next/router';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Switch,
  Row,
  Col,
} from 'antd';
import useGetCertificateDetails from '@/state/certificate/useGetCertificateDetails';
import Loader from '@/components/loader/Loader.component';
import Error from '@/components/error/Error.component';
import { useQueryClient } from '@tanstack/react-query';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';
import CopyField from '@/components/copyField/CopyField.component';
import moment from 'moment';
import useCreateCertificate from '@/state/certificate/useCreateCertificate';
import useUpdateCertificate from '@/state/certificate/useUpdateCertificate';
import dayjs from 'dayjs';

const CertificateDetails = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id } = router.query;
  const {
    data: certificateDetails,
    isFetching,
    isLoading,
    isError,
    error,
  } = useGetCertificateDetails({
    id: id as any,
  });
  const { mutate: createCertificate } = useCreateCertificate();
  const { mutate: updateCertificate } = useUpdateCertificate();
  const [form] = Form.useForm();
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const onFinish = (values: any) => {
    if (id) {
      // update certificate
      console.log(values);
      updateCertificate({
        ...values,
      });
    } else {
      // create certificate
      createCertificate({
        ...values
      });
    }
  };
  React.useEffect(() => {
    if (id && certificateDetails?.certificate) {
      form.setFieldsValue({
        ...certificateDetails?.certificate,
        // convert the string to a dayjs object
        dateOfCompletion: dayjs(
          certificateDetails?.certificate?.dateOfCompletion
        ),
      });
      setImageUrl(certificateDetails?.certificate?.certificateImageUrl);
    }
  }, [certificateDetails?.certificate, certificateDetails?.certificate]);
  React.useEffect(() => {
    // invalidate the projectDetails query when component unmounts
    return () => {
      queryClient.invalidateQueries(['certificateDetails']);
      form.resetFields();
      // specifically set the photo to null
      setImageUrl('');
    };
  }, []);
  if (isLoading) return <Loader />;
  if (isError) return <Error error={error} />;

  return (
    <div className={styles.container}>
      <div className={styles.certificateTitleContainer}>
        <h1 className={styles.certificateTitleHeader}>Certificate Details</h1>
        <p className={styles.certificateTitle}>
          {certificateDetails?.certificate?.name} -{' '}
          <span className={styles.certificateId}>
            <CopyField data={certificateDetails?.certificate?._id} />
          </span>
        </p>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={() => {
          form.validateFields().then((values) => {
            onFinish(values);
          });
        }}
      >
        <div className={styles.contentContainer}>
          <div className={styles.leftContainer}>
            <Form.Item name="_id" hidden={true}>
              <Input />
            </Form.Item>
            <div className={styles.imageUploadContainer}>
              <div className={styles.imageContainer}>
                <PhotoUpload
                  name="certificateImageUrl"
                  default={form.getFieldsValue().certificateImageUrl}
                  value={imageUrl}
                  label=" "
                  form={form}
                  action={
                    process.env.NODE_ENV === 'production'
                      ? `${process.env.API_URL}/upload/cloudinary`
                      : 'http://localhost:5000/api/v1/upload/cloudinary'
                  }
                  placeholder="Upload a Project photo"
                />
              </div>
            </div>
            <Form.Item
              name="certificateImageUrl"
              label="Photo URL"
              rules={[{ required: true }]}
              help="can use an https link, best images are png/webp"
            >
              <Input
                onChange={() =>
                  setImageUrl(form.getFieldsValue().certificateImageUrl)
                }
              />
            </Form.Item>
          </div>
          <div className={styles.rightContainer}>
            <Form.Item name="name" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="issuingAuthority"
              label="Issuing Authority"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="dateOfCompletion" label="Date Of Completion">
              <DatePicker
                className={styles.input}
                allowClear={false}
                defaultValue={dayjs(
                  certificateDetails?.certificate?.dateOfCompletion
                )}
                format="YYYY-MM-DD"
                // onChange={(date) =>
                // setDateOfCompletion(date?.format('YYYY-MM-DD'))
                // }
              />
            </Form.Item>
          </div>
        </div>
        <Row className={styles.footer} justify={'center'}>
          <Button
            className={styles.submitButton}
            htmlType="submit"
            type="primary"
          >
            {id ? 'Update Project' : 'Create Project'}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default CertificateDetails;
