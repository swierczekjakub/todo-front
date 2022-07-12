import React, {useEffect, useState} from 'react';
import {TodoEntity} from "types";
import {TodoForm} from "./TodoForm";
import {Todo} from "./Todo";
import {Spinner} from "../common/Spinner";

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoEntity[] | null>(null);

    const refreshTodos = async () => {
        setTodos(null);
        try {
            const res = await fetch('http://localhost:3001/todo');
            setTodos(await res.json());
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        (async () => {
            await refreshTodos();
        })();
    }, []);

    if (todos === null) {
        return <Spinner/>
    }

    return (
        <div>
            <TodoForm onTodoChange={refreshTodos}/>
            <ul>
                {todos?.map((el: TodoEntity) => <Todo todo={el}/>)}
            </ul>
        </div>
    );
};
