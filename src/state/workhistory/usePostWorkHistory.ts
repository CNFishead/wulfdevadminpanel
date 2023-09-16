import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

// axios action
const postWorkHistory = async (data: any) => {
  const { data: workHistoryData } = await axios.post('/experience', data);
  return workHistoryData;
};

// react query mutation hook
export const usePostWorkHistory = () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => postWorkHistory(data), {
    onSuccess: (data: any) => {
      message.success('Work History Added');
      queryClient.invalidateQueries(['workhistory']);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
