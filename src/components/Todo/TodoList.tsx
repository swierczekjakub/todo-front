import React, {useEffect, useState} from 'react';
import {TodoEntity} from "types";
import {TodoForm} from "./TodoForm";
import {Todo} from "./Todo";

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoEntity[] | null>(null);

    const refreshTodos = async () => {
        setTodos(null);
        const res = await fetch('http://localhost:3001/todo');
        setTodos(await res.json());
    }

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <div>
            <TodoForm/>
            <ul>
                {todos?.map((el: TodoEntity) => <Todo todo={el}/>)}
            </ul>
        </div>
    );
};
