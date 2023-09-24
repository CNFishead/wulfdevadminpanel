import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import BlogType from '@/types/BlogType';

/**
 * @description Axio call to update a Blog
 * @param formData Data from the form to be updated
 * @returns The updated Blog
 */
const updateData = async (formData: BlogType) => {
  const { data } = await axios.put(`/blog/${formData._id}`, formData);
  return data;
};

/**
 * @description react-query hook to update a blog
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => updateData(data), {
    onSuccess: (data: any) => {
      message.success('Blog Updated');
      queryClient.invalidateQueries(['blogDetails']);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
