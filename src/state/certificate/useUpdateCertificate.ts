import ProjectType from '@/types/ProjectType';
import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import CertificateType from '@/types/CertificateType';

/**
 * @description Axio call to update a Certificate
 * @param project The Certificate to be updated
 * @returns The updated Certificate
 */
const updateCertificate = async (certificate: CertificateType) => {
  console.log(certificate);
  const { data } = await axios.put(
    `/certificate/${certificate._id}`,
    certificate
  );
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => updateCertificate(data), {
    onSuccess: (data: any) => {
      message.success('Certificate Updated');
      queryClient.invalidateQueries(['certificateDetails']);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
