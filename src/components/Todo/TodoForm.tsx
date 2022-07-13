import React, {ChangeEvent, FormEvent, useState} from 'react';

interface Props {
    onTodoChange: () => void;
}

export const TodoForm = (props: Props) => {
    const [input, setInput] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean>(true);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!input.length || input.length < 3) {
            setIsCorrect(false);
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
                <button className="todo-button">Add</button>

            </form>
            {isCorrect ? false : <p>Todo must contains at least 3 letters.</p>}
        </>

    );
};
