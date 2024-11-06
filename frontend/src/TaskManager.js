import React, { useState, useEffect } from 'react';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    // Fetch tasks from the backend
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch(err => console.error(err));
    }, []);

    const addTask = () => {
        if (!title) {
            setError('Le titre ne peut pas être vide');
            return;
        }
        fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        })
            .then(response => response.json())
            .then(data => {
                setTasks([...tasks, data]);
                setTitle('');
                setError('');
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    setError('Erreur: Titre requis ou JSON invalide');
                } else {
                    console.error(error);
                }
            });
    };

    return (
        <div>
            <h1>Task Manager</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="New task title"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
}

export default TaskManager;