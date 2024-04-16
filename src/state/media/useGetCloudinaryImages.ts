import axios from '@/utils/axios';
import errorHandler from '@/utils/errorHandler';
import { useQuery } from '@tanstack/react-query';

const fetchImages = async (nextCursor: string | undefined) => {
  const { data } = await axios.get(
    `/cloudinary?nextCursor=${nextCursor}`
  );
  return data;
};

// react-query hook to fetch images from cloudinary
export default (nextCursor?: string) => {
  return useQuery(['cloudinary', nextCursor], () => fetchImages(nextCursor), {
    refetchOnWindowFocus: false,
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
