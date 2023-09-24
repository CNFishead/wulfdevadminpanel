import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const removeDataAction = async (id: string) => {
  const { data } = await axios.delete(`/blog/${id}`);
  return data;
};

/**
 * @description React query mutation hook to remove a blog
 * @param id
 * @returns
 *
 *
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => removeDataAction(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['featuredBlogs']);
      message.success('Blog Removed');
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });
};
