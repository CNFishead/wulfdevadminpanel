import axios from '@/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import errorHandler from '@/utils/errorHandler';

const deleteResource = async (publicId: string, resourceType: string) => {
  const { data } = await axios.post(`/cloudinary/delete`, {
    publicId,
    resourceType,
  });
  return data;
};

/**
 * @description react-query mututation to delete image from cloudinary
 */
export default (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation(
    (options: { id: string; resourceType: string }) =>
      deleteResource(options.id, options.resourceType),
    {
      onSuccess: () => {
        if (onSuccessCallback) {
          onSuccessCallback();
        }
        message.success('Resource Removed');
      },
      onError: (error: any) => {
        console.log(error);
        errorHandler(error);
      },
    }
  );
};
