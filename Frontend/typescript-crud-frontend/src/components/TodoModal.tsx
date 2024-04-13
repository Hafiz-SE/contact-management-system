import React, { useState } from 'react';
import { Todo } from '../js/ApiService';

interface ModalProps {
    todo: Todo | null;
    onClose: () => void;
    isCreating: boolean;
    onSave: (todo: Todo) => void; // Update the type of onSave prop
}

const TodoModal: React.FC<ModalProps> = ({ todo, onClose, onSave, isCreating }) => {
    const [description, setDescription] = useState(todo ? todo.description : '');
    const [priority, setPriority] = useState(todo ? todo.priority : 'High');
    const [isCompleted, setIsCompleted] = useState(todo ? todo.isCompleted : false);

    const handleSave = () => {
        if (isCreating === true) {
            const newTodo: Todo = {
                description,
                priority,
                isCompleted
            };

            onSave(newTodo); // Call onSave with the newTodo object
        } else {
            const updateTodo: Todo = {
                ...todo,
                description,
                priority,
                isCompleted
            };
            onSave(updateTodo)
        }
    };

    return (
        <div className="modal d-flex align-items-center justify-content-center" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{todo ? 'Update Todo' : 'Create Todo'}</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                maxLength={50}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="form-control"
                                id="priority"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="form-group form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isCompleted"
                                checked={isCompleted}
                                onChange={(e) => setIsCompleted(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="isCompleted">Completed</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>{todo ? 'Update' : 'Create'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoModal;
