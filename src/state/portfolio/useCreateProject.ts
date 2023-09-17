import ProjectType from '@/types/ProjectType';
import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { useRouter } from 'next/router';

/**
 * @description Axio call to update a project
 * @param project The project to be updated
 * @returns The updated project
 */
const updateProject = async (project: ProjectType) => {
  const { data } = await axios.post(`/project`, project);
  return data;
};

/**
 * @description react-query hook to update a project
 */
export default () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation((data: any) => updateProject(data), {
    onSuccess: (data: any) => {
      console.log(data);
      message.success('Project Created');
      queryClient.invalidateQueries(['projectDetails']);
      // route the client to the updated project
      router.push(`/professional_oddysey/projects/${data?.project?._id}`);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
