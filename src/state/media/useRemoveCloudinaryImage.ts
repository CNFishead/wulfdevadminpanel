import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import errorHandler from '@/utils/errorHandler';

const deleteResource = async (publicId: string) => {
  const { data } = await axios.post(`/cloudinary/delete`, { publicId });
  return data;
};

/**
 * @description react-query mututation to delete image from cloudinary
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteResource(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cloudinary']);
      message.success('Resource Removed');
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });
};
