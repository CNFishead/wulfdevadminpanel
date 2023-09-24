import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { useRouter } from 'next/router';
import BlogType from '@/types/BlogType';

/**
 * @description Axio call to update a Certificate
 * @param project The Certificate to be updated
 * @returns The updated Certificate
 */
const postFormData = async (formData: BlogType) => {
  const { data } = await axios.post(`/blog`, formData);
  return data;
};

/**
 * @description react-query hook to update a Certificate
 */
export default () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((data: any) => postFormData(data), {
    onSuccess: (data: any) => {
      message.success('Blog Created');
      router.push(`/professional_oddysey/blog/${data?.blog?._id}`);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
