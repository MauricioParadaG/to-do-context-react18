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
      <TodoHeader loading={loading}>
        <TodoCounter
          total={totalTodos}
          completed={completedTodos}
          /* loading={loading} */ />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          /* loading={loading} */ />
      </TodoHeader>
      <TodoList
        error={error}
        loading={loading}
        searchedTodos={searchedTodos}
        onError={() => <p>Desespérate, hubo un error...</p>}
        onEmptySearch={() => <p>No existen To-Do's para el texto: {searchValue}</p>}
        onLoading={() => new Array(4).fill().map((item, index) => (
          <li className="TodoItem-loading" key={index}>
            <div className="LoaderBalls">
              <span className="LoaderBalls__item" />
              <span className="LoaderBalls__item" />
              <span className="LoaderBalls__item" />
            </div>
          </li>
        ))}
        renderTodos={todo => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        )}
      />
      {/*       <TodoList>
        {error && <p>Desespérate, hubo un error...</p>}
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
      </TodoList> */}
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
