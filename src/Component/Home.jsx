import React, { useState, useEffect } from 'react';

function Home() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [input, setInput] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editInput, setEditInput] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);
    useEffect(() => {
        const updateTimeAndGreeting = () => {
            const now = new Date();
            const hours = now.getHours();
            const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });


            let greeting = 'Good evening';
            if (hours < 12) greeting = 'Good morning';
            else if (hours < 18) greeting = 'Good afternoon';

            setCurrentTime(`${dateString} ${timeString}`);
            setGreeting(greeting);
        };

        updateTimeAndGreeting();
        const intervalId = setInterval(updateTimeAndGreeting, 1000);

        return () => clearInterval(intervalId);
    }, []);
    const addTodo = () => {
        const newTodo = input.trim();
        if (newTodo) {
            setTodos([...todos, newTodo]);
            setInput('');

            setEditIndex(-1);
            setEditInput('');
        }
    };

    const removeTodo = (index, event) => {
        event.stopPropagation();
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);


        if (index === editIndex) {
            setEditIndex(-1);
            setEditInput('');
        }
    };

    const startEdit = (index) => {
        setEditIndex(index);
        setEditInput(todos[index]);
    };

    const cancelEdit = () => {
        setEditIndex(-1);
        setEditInput('');
    };

    const saveEdit = () => {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = editInput.trim();
        setTodos(updatedTodos);
        cancelEdit();
    };

    return (<>
        <div className="clock">
            <h2>{greeting}</h2>
            <p>{currentTime}</p>
        </div>
        <div className="todo-container">

            <input
                type="text"
                className="todo-input"
                placeholder="Add a new todo"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={addTodo}>Add Todo</button>
            <ul className="todo-list">
                {todos.map((todo, index) => (
                    editIndex === index ? (
                        <li key={index}>
                            <span>{index + 1}. </span> { }
                            <input
                                type="text"
                                value={editInput}
                                onChange={(e) => setEditInput(e.target.value)}
                            />
                            <button onClick={saveEdit}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                        </li>
                    ) : (
                        <li key={index} onClick={() => startEdit(index)}>
                            <span>{index + 1}. </span>{todo} { }
                            <button onClick={(e) => removeTodo(index, e)}>Delete</button>
                        </li>
                    )
                ))}
            </ul>
        </div>
    </>
    );
}

export default Home;