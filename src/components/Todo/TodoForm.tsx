import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { TodoEntity } from 'types';
import "./TodoList.css";

interface Props {
    todos: TodoEntity[];
    onTodoChange: () => void;
}

export const TodoForm = (props: Props) => {
    const [input, setInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean>(true);
    const [isExists, setIsExists] = useState<boolean>(true);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (props.todos.find(el => el.name === input)) {
            setIsExists(false);
            setIsCorrect(true);
            return;
        }

        if (!input.length || input.length < 3 || input.length > 60) {
            setIsCorrect(false);
            setIsExists(true);
            return;
        }

        await fetch('http://localhost:3001/todo', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: input
            }),
        })
        setInput('');
        props.onTodoChange();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setInput(e.target.value);
    };

    useEffect(() => {

    }, [isExists, isCorrect])

    return (
        <>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter a todo"
                    value={input}
                    name="text"
                    onChange={handleChange}
                />
                <button className="todo-button"><i className="fa-solid fa-plus"/></button>

            </form>
            <div className="todo-message">
                {isExists ? false : <p>A todo with this name already exists.</p>}
                {isCorrect ? false : <p>Todo has to be between 3 and 60 characters.</p>}
            </div>
        </>

    );
};
