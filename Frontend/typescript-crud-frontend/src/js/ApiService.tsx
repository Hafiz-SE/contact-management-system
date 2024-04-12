import axios, { AxiosResponse } from 'axios';

interface Contact {
    userId: number;
    id: number;
    title: string;
    body: string;

}
export const fetchContacts = async (): Promise<Contact[]> => {
    try {
        const response: AxiosResponse<Contact[]> = await axios.get<Contact[]>('/posts');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching todos');
    }
};