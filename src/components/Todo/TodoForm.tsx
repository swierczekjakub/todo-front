import React, {useState} from 'react';

export const TodoForm = () => {
    const [input, setInput] = useState<string>('');

    return (
        <form className="todo-form">
            <input
                type="text"
                placeholder="Enter a todo"
                value={input}
                name="text"
            />
            <button className="todo-button">Add</button>
        </form>
    );
};
