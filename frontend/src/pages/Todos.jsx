import React, { useContext } from 'react';
import { TodoContext } from '../context/data';
import { Link } from 'react-router-dom';
import { task_api_endpoint } from '../utils/constants';
import toast from 'react-hot-toast';

const Todos = () => {
    const todoContext = useContext(TodoContext);
    const { data, setData } = todoContext;

    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${task_api_endpoint}/deleteTask/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const resdata = await res.json();

            if (resdata.success === true) {
                toast.success(resdata.message);
                const updatedTasks = data.filter(task => task._id !== id);
                setData(updatedTasks);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4 bg-white">Task List</h1>

            <div className='mb-4'>
                <Link to="/createTask" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 
                transition duration-300">Create Todo</Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {data.length > 0 ? (
                    data.map(task => (
                        <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
                            <strong>Title:</strong> {task.title}<br />
                            <strong>Description</strong>{task.description} <br />
                            <strong>Due Date:</strong> {task.duedate.split('T')[0]}<br />
                            <strong>Status:</strong> {task.status}<br />

                            <div className="flex justify-end mt-2">
                                <Link to={`/editTask/${task._id}`} className="text-blue-500 hover:underline mr-2">Edit</Link>
                                <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300">Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1 className="text-xl text-gray-500 mt-4">Please Create Todo first</h1>
                )}
            </div>
        </div>
    );
}

export default Todos;
