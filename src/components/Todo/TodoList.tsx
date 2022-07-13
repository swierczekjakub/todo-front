import React, {useEffect, useState} from 'react';
import {TodoForm} from "./TodoForm";
import {Todo} from "./Todo";
import {Spinner} from "../common/Spinner";
import { TodoEntity, NumBool } from 'types';

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

    const handleDeleteTodo = async (id: string) => {
        setTodos(null);
        try {
            await fetch(`http://localhost:3001/todo/${id}`, {
                method: "DELETE",
            });
        } catch (e) {
            console.log(e);
        }
        const updatedTodos = todos!.filter((todo) => todo.id !== id);

        setTodos(updatedTodos);
    };

    const handleCheckTodo = async (id: string) => {
        setTodos(null);

        const updatedTodos = todos!.map(todo => {
            if (todo.id === id) {
                const checkedTodo = {
                    ...todo,
                    isCompleted: Number(!todo.isCompleted) as NumBool,
                }
                console.log(checkedTodo);
                (async () => {
                    await fetch(`http://localhost:3001/todo/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-type': 'application/json',
                        },
                        body: JSON.stringify({
                            updatedTodo: {...checkedTodo},
                        }),
                    })
                })()
                return checkedTodo;
            }
            return todo
        })

        setTodos(updatedTodos);
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
                {todos?.map((todo: TodoEntity) =>
                    <Todo
                        todo={todo}
                        key={todo.id}
                        handleDeleteTodo={handleDeleteTodo}
                        handleCheckTodo={handleCheckTodo}
                    />)}
            </ul>
        </div>
    );
};
