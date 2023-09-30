import axios from '@/utils/axios';
import { message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';

const fetchUser = async () => {
  const { data } = await axios.get('/user/me');
  return data;
};

// react-query to get the data
export default (options: {
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery(['userDetails'], () => fetchUser(), {
    onSuccess: options?.onSuccess,
    onError: (error: any) => {
      errorHandler(error);
    },
  });
  return query;
};
