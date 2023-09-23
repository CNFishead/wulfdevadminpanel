import axios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

const fetchDetails = async (id: string) => {
  const { data } = await axios.get(`/certificate/${id}`);
  return data;
};

// react-query to get the data
export default (options: {
  id: string;
  // onSuccess is a callback function that will be called on success, to do something with the data
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}) => {
  const query = useQuery(['certificateDetails'], () => fetchDetails(options.id), {
    onSuccess: options?.onSuccess,
    // dont do anything if there is no id
    enabled: !!options.id,
    retry: 1,
    onError: () => {
      message.error('Error getting certificate details');
    },
  });
  return query;
};
