// TodoCard.js
import React from 'react';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import './TodoCard.css'

const TodoCard = ({ todo, onComplete, onDelete }) => {
  const { title, description, status, flag } = todo;

  return (
    <div className='card'>
      <TodoHeader title={title} description={description} />
      <TodoFooter status={status} flag={flag} onComplete={onComplete} onDelete={onDelete} />
    </div>
  );
};

export default TodoCard;
