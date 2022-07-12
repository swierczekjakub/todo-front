import React from 'react';
import { TodoEntity } from 'types';

interface Props {
    todo: TodoEntity;
}

export const Todo = (props: Props) => {
    return (
        <li>
            {props.todo.name}
        </li>
    );
};
