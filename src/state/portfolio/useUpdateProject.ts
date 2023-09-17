import ProjectType from '@/types/ProjectType';
import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';

/**
 * @description Axio call to update a project
 * @param project The project to be updated
 * @returns The updated project
 */
const updateProject = async (project: ProjectType) => {
  const { data } = await axios.put(`/project/${project._id}`, project);
  return data;
};

/**
 * @description react-query hook to update a project
 */
export default () => {
  const queryClient = useQueryClient();
  return useMutation((data: any) => updateProject(data), {
    onSuccess: (data: any) => {
      message.success('Project Updated');
      queryClient.invalidateQueries(['projectDetails']);
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
