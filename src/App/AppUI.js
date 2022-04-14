import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { FormTodo } from '../FormTodo';
import { Modal } from '../Modal';
import './AppUI.css';

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <p>Desespérate, hubo un error...</p>}
        {/* Skeleton css  */}
        {loading &&
          new Array(4).fill().map((item, index) => (
            <li className="TodoItem-loading">
            <div className="LoaderBalls">
                <span className="LoaderBalls__item"></span>
                <span className="LoaderBalls__item"></span>
                <span className="LoaderBalls__item"></span>
            </div>
        </li>
          ))}
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>
      {openModal &&
        <Modal>
          <FormTodo />
        </Modal>}

      <CreateTodoButton />
    </React.Fragment>
  );
}

export { AppUI };
