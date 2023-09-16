import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

// axios action
const deleteWorkHistory = async (id: string) => {
  const { data: workHistoryData } = await axios.delete(`/experience/${id}`);
  return workHistoryData;
};

// react query mutation hook
export default () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => deleteWorkHistory(id), {
    onSuccess: (data: any) => {
      message.success('Work History Removed');
      queryClient.invalidateQueries(['workhistory']);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
