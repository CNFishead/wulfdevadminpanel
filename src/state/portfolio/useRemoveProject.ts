import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const removeProjectAction = async (id: string) => {
  const { data } = await axios.delete(`/project/${id}`);
  return data;
};

/**
 * @description React query mutation hook to remove a project
 * @param id
 * @returns
 *
 *
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => removeProjectAction(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['portfolio']);
      message.success('Project Removed');
    },
    onError: (error: any) => {
      console.log(error);
      errorHandler(error);
    },
  });
};
