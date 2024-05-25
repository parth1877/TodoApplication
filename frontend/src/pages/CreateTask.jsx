import React, { useState } from 'react';
import { task_api_endpoint } from '../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const CreateTask = () => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        duedate: '',
        status: ''
    });

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask(prevTask => ({
            ...prevTask,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setTask({
            title: '',
            description: '',
            duedate: '',
            status: ''
        });

        try {
            const res = await axios.post(`${task_api_endpoint}/createTask`, {
                title: task.title,
                description: task.description,
                duedate: task.duedate,
                status: task.status
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            if (res.data.success === true) {
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Title:</label>
                    <input type="text" name="title" value={task.title} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Description:</label>
                    <input type="text" name="description" value={task.description} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Due Date:</label>
                    <input type="date" name="duedate" value={task.duedate} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400" />
                </div>

                <div>
                    <label className="block mb-1">Status:</label>
                    <select name="status" value={task.status} onChange={handleChange} required className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-400">
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Create Task</button>
            </form>
            <br />
            <Link to={"/"}>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Back</button>
            </Link>
        </div>
    );
}

export default CreateTask;
