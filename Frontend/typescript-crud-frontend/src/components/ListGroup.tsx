import React, { useState, useEffect } from 'react';
import { fetchTodoList, Todo, registerTodo, updateTodo, deleteTodo } from './../js/ApiService';
import TodoModal from './TodoModal';

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
    const [isCreating, setIsCreating] = useState(false); // New state to track if we are creating or editing a todo

    useEffect(() => {
        const fetchData = async () => {
            try {
                const todoList = await fetchTodoList();
                setTodos(todoList);
            } catch (error) {
                console.error('Error fetching todos:', error);
            }
        };

        fetchData(); // Call the API when component mounts
    }, []);

    const handleNewTodoClick = () => {
        setShowModal(true);
        setSelectedTodo(null);
        setIsCreating(true); // Set to true when creating a new todo
    };

    const handleEditTodo = (todo: Todo) => {
        setShowModal(true);
        setSelectedTodo(todo);
        setIsCreating(false); // Set to false when editing an existing todo
    };

    const handleDeleteTodo = async (todo: Todo) => {
        try {
            // Call the deleteTodo method with the todo id
            await deleteTodo(todo);

            // Filter out the deleted todo from the todos list
            const updatedTodos = todos.filter(t => t.id !== todo.id);
            setTodos(updatedTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }

    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSaveTodo = async (todo: Todo) => {
        try {
            if (isCreating) {
                const newTodoId = await registerTodo(todo); // Assuming registerTodo returns the new todo id

                const newTodo: Todo = {
                    id: newTodoId.id,
                    description: todo.description,
                    isCompleted: todo.isCompleted,
                    priority: todo.priority
                };

                setTodos([...todos, newTodo]);
            }
            else {
                await updateTodo(todo);
                const updatedTodos = todos.map(t => t.id === todo.id ? todo : t);
                setTodos(updatedTodos);
            }
            setShowModal(false);
        } catch (error) {
            console.error('Error saving todo:', error);
        }
    };

    const getPriorityColor = (todo: Todo) => {
        if (todo.isCompleted) {
            return '#eff1f3';
        } else {
            switch (todo.priority) {
                case 'Low':
                    return '#cae9ff';
                case 'Medium':
                    return '#bee9e8';
                case 'High':
                    return '#62b6cb';
                default:
                    return '';
            }
        }
    };


    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">Todo List</h1>
                <button className="btn btn-primary" onClick={handleNewTodoClick}>Add New Todo</button>
            </div>
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo.id} className="list-group-item" style={{ backgroundColor: getPriorityColor(todo) }}>
                        <div>
                            <strong>Description: </strong>{todo.description}
                        </div>
                        <div>
                            <strong>Priority: </strong>{todo.priority}
                        </div>
                        <div>
                            <strong>Completed: </strong>{todo.isCompleted ? 'Yes' : 'No'}
                        </div>
                        <div className="mt-2" style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-primary" style={{ backgroundColor: 'transparent', color: 'black' }} onClick={() => handleEditTodo(todo)}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-primary" style={{ backgroundColor: 'transparent', color: 'black' }} onClick={() => handleDeleteTodo(todo)}>
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {showModal && <TodoModal todo={selectedTodo} onSave={handleSaveTodo} onClose={handleCloseModal} isCreating={isCreating} />}        </div>
    );
};

export default TodoList;
