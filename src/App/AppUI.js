import React from 'react';
import { TodoContext } from '../TodoContext';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { FormTodo } from '../FormTodo';
import { Modal } from '../Modal';
import { TodoHeader } from '../TodoHeader';
import './AppUI.css';

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoHeader>
        <TodoCounter
          total={totalTodos}
          completed={completedTodos} />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue} />
      </TodoHeader>
      <TodoList>
        {error && <p>Desespérate, hubo un error...</p>}
        {/* Skeleton css  */}
        {loading &&
          new Array(4).fill().map((item, index) => (
            <li className="TodoItem-loading" key={index}>
              <div className="LoaderBalls">
                <span className="LoaderBalls__item"/>
                <span className="LoaderBalls__item"/>
                <span className="LoaderBalls__item"/>
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
