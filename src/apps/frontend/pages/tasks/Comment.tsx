import * as React from 'react';
import './task.css';

type CommentProps = {
  comment: {
    id: string,
    text: string;
  };
};

const Comment = ({comment}: CommentProps) => {

    return (
        <p>{comment.text}</p>
    
  );
};


export default Comment;