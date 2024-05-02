// TodoFooter.js
import React from 'react';
import Badge from '../../UIElements/Badge';
import Button from '../../UIElements/Button';
import './TodoFooter.css'

const TodoFooter = ({ status, flag, onComplete, onDelete }) => {
  return (
    <div className="row justify-content-between">
      <Badge type={status} />
      <div className='right'>
      <Button  onClick={onComplete}>Complete</Button> {" "}
      <Button onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
};

export default TodoFooter;
