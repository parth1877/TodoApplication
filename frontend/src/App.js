import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import Todos from './pages/Todos';
import EditTaskForm from './pages/EditTaskForm';
import './index.css';



function App() {
  return (
    <div className="App">
      
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path='/getAllTodos' element={<Todos/>}/>
        <Route path='/editTask/:id' element={<EditTaskForm/>}/>
      </Routes>
    </div>

    
  );
}

export default App;
