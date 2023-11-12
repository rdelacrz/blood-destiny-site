import { ContactInfo } from '@/models';
import { apiService } from '@/services';


const CONTROLLER = 'contacts';

export const contactService = {
    sendContactEmail: (contactInfo: ContactInfo) => {
        const url = `${CONTROLLER}/email`;
        return apiService.post<boolean>(url, contactInfo);
    },
}