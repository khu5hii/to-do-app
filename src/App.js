import { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

function App() {

  const [todo, setTodo] = useState();
  const [todoList, setTodoList] = useState([]);

  const onTodoInputChange = (e) => {
    setTodo(e.target.value)
  }

  const onAddTodoClick = () => {

    if(!todo || todo.trim() === '') {
      return;
    }
    setTodoList([...todoList, { id: uuid(), todo: todo, isCompleted: false }]);
    setTodo('');
  }

  const onDeleteClick = (id) => {
    const updatedTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(updatedTodoList)
  }

  const onTodoCheckChange = (id) => {
    const updatedTodoList = todoList.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)
    setTodoList(updatedTodoList)
    console.log(updatedTodoList)
  }

  return (
    <div className="App background">
      <div className='content'>
        <input className='input' value={todo} onChange={onTodoInputChange} placeholder='Enter your To-Do' />
        <button className='add-button' onClick={onAddTodoClick}>Add</button>
      </div>
      <div className='outside-div'>
        {
          todoList?.length > 0 && todoList.map(todo => (
            <div className='todo-list' key={todo.id}>
              <div className='left'>
                <label>
                  <input className='checkbox' onChange={() => onTodoCheckChange(todo.id)} type='checkbox' />
                  <span className={todo.isCompleted ? 'strike-through' : ''}>{todo.todo} </span>
                </label>
              </div>
                <div className='right'>
                <button className='delete-button' onClick={() => onDeleteClick(todo.id)}>Delete</button>
                </div>
            </div>
          ))
        }
      </div>

    </div>

  );
}

export default App;
