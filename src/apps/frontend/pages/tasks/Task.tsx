import TaskService from 'frontend/services/task.service';
import { ApiResponse } from 'frontend/types';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';
import * as React from 'react';
import Comment from './Comment';

type TaskProps = {
  task: {
    id: string,
    title: string;
    description?: string;
  };
};

type CommentType = {
  id: string;
  text: string;
};

type CommentResponse = {
  items: CommentType[];
  [key: string]: any; // everything else is "whatever"
};

function Task({ task }: TaskProps) {

  const [text, setText] = React.useState("")
  const [children, setChildren] = React.useState<JSX.Element[]>([])

  async function getComments() {
      
      const savedToken = getAccessTokenFromStorage();

      if (savedToken) {
          const taskService = new TaskService();
          const response =  await taskService.getComments(savedToken, task.id) as ApiResponse<CommentResponse>;
          setChildren(response.data!.items.map((item) => <Comment comment={item} />))
      }
      
  }

  React.useEffect(() => {

    getComments()
  }, [])

  async function handleClick2() {
          
          const savedToken = getAccessTokenFromStorage();
  
          if (savedToken) {
              const taskService = new TaskService();
              const response =  await taskService.createComment(savedToken, task.id, text);
              console.log(response.data)
          }
          
      }

  return (
    <div className="task">
      <div className="left">
        <h1>{task.title}</h1>
        <p>{task.description}</p>
      </div>
      <div className="comments">
        {children}
        <input type='text' placeholder='title' onChange={(e) => setText(e.target.value)} value={text} />
        <button onClick={handleClick2}>Create task</button>
      </div>
    </div>
  );
}

export default Task;
