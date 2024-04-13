import axios, { AxiosResponse } from 'axios';

interface Contact {
    id: string;
    description: string;
    isCompleted: boolean;
    priority: string;

}
export const fetchContacts = async (): Promise<Contact[]> => {
    try {
        const response: AxiosResponse<Contact[]> = await axios.get<Contact[]>('/list');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching todos');
    }
};