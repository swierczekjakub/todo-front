import React, {ChangeEvent, useState} from 'react';
import {TodoEntity} from 'types';
import "./TodoList.css";

interface Props {
    todo: TodoEntity;
    handleDeleteTodo: (id: string) => void
    handleCheckTodo: (id: string) => void
    handleEditTodo: (id: string, value: string) => void
}

export const Todo = ({handleCheckTodo, handleDeleteTodo, handleEditTodo, todo}: Props) => {
    const [isEditOn, setIsEditOn] = useState<boolean>(false);
    const [input, setInput] = useState<string>('');

    const onEdit = () => {
        if(!isEditOn) {
            setIsEditOn(true);
        } else if (isEditOn) {
            setIsEditOn(false);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput(e.target.value);
    };

    const onTodoUpdate = (todo: TodoEntity) => {
        onEdit();
        if (input) {
            handleEditTodo(todo.id!, input);
            setInput('');
        }
    }

    return (
        <li style={todo.isCompleted ? {textDecoration: 'line-through', background: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"} : {}}>
            {
                isEditOn ?
                    <>
                        <input
                            className="todo-edit-input"
                            type="text"
                            placeholder="Edit your todo..."
                            value={input}
                            name="text"
                            onChange={handleChange}
                        />
                        <button className="btn-check" onClick={() => onTodoUpdate(todo)}><i className="fa-solid fa-check"/></button>
                    </>
                :
                <>
                    {todo.name}
                    <input
                        className="check-input"
                        type="checkbox"
                        checked={Boolean(todo.isCompleted)}
                        onChange={() => handleCheckTodo(todo.id!)}
                    />
                    <button className="btn-pen" disabled={Boolean(todo.isCompleted) ?? true} onClick={() => onEdit()}><i className="fa-solid fa-pen"/></button>
                    <button className="btn-trash" onClick={() => handleDeleteTodo(todo.id!)}><i className="fa-solid fa-trash-can"/></button>
                </>
            }
        </li>
    );
};
