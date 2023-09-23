import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const removeCertificateAction = async (id: string) => {
  const { data } = await axios.delete(`/certificate/${id}`);
  return data;
};

/**
 * @description React query mutation hook to remove a certificate
 * @param id
 * @returns
 *
 *
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => removeCertificateAction(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['certificate']);
      message.success('Certificate Removed');
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });
};
