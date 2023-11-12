import { Update } from '@/models';
import { apiService } from '@/services';


const CONTROLLER = 'updates';

export const updateService = {
  getUpdatePosts: () => {
    const url = `${CONTROLLER}`;
    return apiService
      .get<Update[]>(url)
      .then(resp => resp.data as Update[]);
  },
}