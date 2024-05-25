import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { task_api_endpoint } from '../utils/constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TodoContext } from '../context/data';

const Home = () => {
    
    const todoContext = useContext(TodoContext)
    const navigate = useNavigate()
    
    const clickHandler = async () =>{
        try {
            const res = await axios.get(`${task_api_endpoint}/getAlltasks`,
            { 
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            todoContext.setData(res.data.alltasks)
            navigate("/getAllTodos");
    
        } catch (error) {
            console.error(error);
        }
    }
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
        <Link to={"/createTask"}>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4">
                Create Todo
            </button>
        </Link>
        
        <button onClick={clickHandler} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
            See All Todos
        </button>
    </div>
  )
}

export default Home
