import axios, { AxiosResponse } from 'axios';

export interface Todo {
    id?: string;
    description: string;
    isCompleted: boolean;
    priority: string;
}

export const fetchTodoList = async (): Promise<Todo[]> => {
    try {
        const response: AxiosResponse<Todo[]> = await axios.get<Todo[]>('/list');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching todos');
    }
};

export const registerTodo = async (todo: Todo): Promise<Todo> => {
    try {
        const response: AxiosResponse<Todo> = await axios.post<Todo>('/register', todo);
        return response.data;
    } catch (error) {
        throw new Error('Error posting todo');
    }
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    try {
        const response: AxiosResponse<Todo> = await axios.put<Todo>('/edit', todo);
        return response.data;
    } catch (error) {
        throw new Error('Error updating todo');
    }
};

export const deleteTodo = async (todo: Todo): Promise<void> => {
    try {
        await axios.delete(`/id/${todo.id}`);
    } catch (error) {
        throw new Error('Error deleting todo');
    }
};
