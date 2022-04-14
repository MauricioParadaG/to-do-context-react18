import React from 'react';
import { useTodoProvider } from './useTodoProvider';
import { TodoCounter } from '../TodoCounter';
import { TodoSearch } from '../TodoSearch';
import { TodoList } from '../TodoList';
import { TodoItem } from '../TodoItem';
import { CreateTodoButton } from '../CreateTodoButton';
import { FormTodo } from '../FormTodo';
import { Modal } from '../Modal';
import { TodoHeader } from '../TodoHeader';
import './AppUI.css';

function App() {
  const {
    error,
    loading,
    searchedTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
    totalTodos,
    completedTodos,
    searchValue,
    setSearchValue,
    addTodo
  } = useTodoProvider();
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
                <span className="LoaderBalls__item" />
                <span className="LoaderBalls__item" />
                <span className="LoaderBalls__item" />
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
          <FormTodo
            addTodo={addTodo}
            setOpenModal={setOpenModal} />
        </Modal>}
      <CreateTodoButton
        openModal={openModal}
        setOpenModal={setOpenModal} />
    </React.Fragment>
  );
}
export default App;
