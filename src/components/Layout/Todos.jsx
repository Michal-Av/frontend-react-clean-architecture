// TodoList.js
import React,{ useState, useEffect } from 'react';
import TodoCard from '../Containers/Todo/TodoCard';
import { UpdateTodo, deleteTodo, getAllTodos, getTodo } from '../../services/api-todos';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getAllTodos()
      .then(resp => { setTodos(resp.data); })

  }, [])

  /**
   * 
   * @param {Object} id
   * delete the card and refresh the window  
   */
  const onDelete = async (id) => {
    await deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id)); // Remove the deleted todo from the local state
  }
  
  const onComplete = async (id) => {
    let obj = {
      status: "Done"
    };
    await UpdateTodo(id, obj); // Update the todo status
    setTodos(prevTodos => prevTodos.map(todo => todo._id === id ? {...todo, status: "Done"} : todo)); // Update the status of the completed todo in the local state
  }
  
  
  return (
    <div style={{paddingTop:'10px'}}>
      <h2>Todo List</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      {todos.map(todo => (
        <TodoCard key={todo._id} todo={todo} onComplete={() => onComplete(todo._id)} onDelete={() => onDelete(todo._id)} />
      ))}
    </div>
    </div>
  );
};

export default TodoList;
