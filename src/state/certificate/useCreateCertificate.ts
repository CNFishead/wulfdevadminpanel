import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import CertificateType from '@/types/CertificateType';
import { useRouter } from 'next/router';

/**
 * @description Axio call to update a Certificate
 * @param project The Certificate to be updated
 * @returns The updated Certificate
 */
const updateCertificate = async (certificate: CertificateType) => {
  const { data } = await axios.post(`/certificate`, certificate);
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((data: any) => updateCertificate(data), {
    onSuccess: (data: any) => {
      message.success('Certificate Created');
      queryClient.invalidateQueries(['certificateDetails']);
      router.push(
        `/professional_oddysey/certificates/${data?.certificate?._id}`
      );
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
