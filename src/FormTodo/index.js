import React, { useState } from 'react';
import './FormTodo.css';


function FormTodo({ setOpenModal, addTodo }) {
  const [newTodoTextarea, setNewTodoTextarea] = useState('');

  const wroteUser = (event) => {
    console.log(event.target.value);
    setNewTodoTextarea(event.target.value);
  }

  const onClickButtonAdd = (event) => {
    event.preventDefault();
    addTodo(newTodoTextarea);
    setOpenModal(false);
  };

  const onClickButtonDiscard = () => {
    setOpenModal(false);
  };
  return (
    <form onSubmit={onClickButtonAdd}>
      <label htmlFor="">Type a new ToDo</label>
      <textarea
        onChange={wroteUser}
        value={newTodoTextarea}
        placeholder='Example: Review Roadmap'
      />
      <div className="TodoForm-buttonContainer">
        <button
          className="TodoForm-button TodoForm-button-cancel"
          onClick={() => onClickButtonDiscard()}
          type="button">
          Discard
        </button>
        <button
          className="TodoForm-button TodoForm-button-add"
          type="submit">
          Add
        </button>
      </div>
    </form>
  );
}

export { FormTodo };
