import { Update } from '@/models';
import { apiService } from '@/store/services';


const CONTROLLER = 'updates';

export const updateService = {
    getUpdatePosts: () => {
        const url = `${CONTROLLER}`;
        return apiService.get<Update[]>(url);
    },
}