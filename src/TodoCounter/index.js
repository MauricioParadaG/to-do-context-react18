import React, { useContext } from 'react';
import { TodoContext } from '../TodoContext';
import './TodoCounter.css';

function TodoCounter() {
  const {totalTodos:total, completedTodos:completed } = useContext(TodoContext);

  return (
    <h2 className="TodoCounter">Has completado {completed} de {total} TODOs</h2>
  );
}

export { TodoCounter };
