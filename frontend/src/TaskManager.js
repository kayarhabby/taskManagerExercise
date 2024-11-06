import React, { useState, useEffect } from 'react';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [error, setError] = useState('');

    // Fetch tasks from the backend
    useEffect(() => {
        fetch('http://localhost:3000/tasks')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => setTasks(data))
            .catch(err => {
                setError(`Failed to fetch tasks: ${err.message}`);
                console.error(err);
            });
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
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTasks([...tasks, data]);
                setTitle('');
                setError('');
            })
            .catch(error => {
                if (error.message.includes('400')) {
                    setError('Erreur: Titre requis ou JSON invalide');
                } else if (error.message.includes('404')) {
                    setError('Erreur: URL non trouvée');
                } else {
                    setError('Erreur lors de l\'ajout de la tâche');
                }
                console.error(error);
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
