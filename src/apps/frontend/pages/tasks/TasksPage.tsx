import * as React from 'react';
import './task.css';
import TaskService from 'frontend/services/task.service';
import {
  getAccessTokenFromStorage
} from 'frontend/utils/storage-util';
import Task from './Task'
import { ApiResponse } from 'frontend/types';

type TaskType = {
  id: string;
  title: string;
  description?: string;
};

type TaskResponse = {
  items: TaskType[];
  [key: string]: any; // everything else is "whatever"
};

const TasksPage = () => {

    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [children, setChildren] = React.useState<JSX.Element[]>([])

    async function getTasks() {
        
        const savedToken = getAccessTokenFromStorage();

        if (savedToken) {
            const taskService = new TaskService();
            const response =  await taskService.getTasks(savedToken) as ApiResponse<TaskResponse>;
            setChildren(response.data!.items.map((item) => <Task task={item} />))
        }
        
    }

    React.useEffect(() => {

        getTasks()
    }, [])

    async function handleClick2() {
        
        const savedToken = getAccessTokenFromStorage();

        if (savedToken) {
            const taskService = new TaskService();
            const response =  await taskService.createTask(savedToken, title, description);
            console.log(response.data)
        }
        
    }
    return (
        <div className="task-container">
            {children}
            <input type='text' placeholder='title' onChange={(e) => setTitle(e.target.value)} value={title} />
            <textarea placeholder='description' onChange={(e) => setDescription(e.target.value)} value={description} />
            <button onClick={handleClick2}>Create task</button>
        </div>
    );
};


export default TasksPage;