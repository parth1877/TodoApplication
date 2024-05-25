import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { task_api_endpoint } from '../utils/constants';
import toast from 'react-hot-toast';

const EditTaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({
        title: '',
        description: '',
        duedate: '',
        status: ''
    });

    useEffect(() => {
        const fetchTaskDetails = async () => {
            try {
                const response = await fetch(`${task_api_endpoint}/getTask/${id}`);
                if (response.ok) {
                    const taskData = await response.json();
                    setTask(taskData.task);
                } else {
                    console.error('Failed to fetch task details');
                }
            } catch (error) {
                console.error('Error fetching task details:', error);
            }
        };

        fetchTaskDetails();

    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${task_api_endpoint}/updateTask/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(task),
            });

            const resData = await response.json();

            if (response.ok) {
                navigate('/');
                toast.success(resData.message);
            } else if (response.status === 409) {
                console.error('Conflict: Another user may have modified the task. Please refresh and try again.');

            } else {
                console.error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input type="text" name="title" value={task.title} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Description:</label>
                    <input type="text" name="description" value={task.description} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Due Date:</label>
                    <input type="date" name="duedate" value={task.duedate.split('T')[0]} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Status:</label>
                    <select name="status" value={task.status} onChange={handleChange} className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Save</button>
            </form>
        </div>
    );
};

export default EditTaskForm;
