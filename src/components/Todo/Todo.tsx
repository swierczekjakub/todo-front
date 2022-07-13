import React, {FormEvent} from 'react';
import { TodoEntity } from 'types';

interface Props {
    todo: TodoEntity;
    handleDeleteTodo: (id: string) => void
    handleCheckTodo: (id: string) => void
}

export const Todo = ({handleCheckTodo, handleDeleteTodo, todo}: Props) => {
    return (
        <li>
            {todo.name}
            <input
                type="checkbox"
                checked={Boolean(todo.isCompleted)}
                onChange={() => handleCheckTodo(todo.id!)}
            />
            <button><i className="fa-solid fa-pen"/></button>
            <button onClick={() => handleDeleteTodo(todo.id!)}><i className="fa-solid fa-trash-can"/></button>
        </li>
    );
};
