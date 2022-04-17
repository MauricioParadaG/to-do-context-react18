import React from 'react';
import './TodoList.css'

function TodoList(props) {
  return (
    <section>
      {props.Error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.searchedTodos.length && props.onEmptySearch()}
      {!props.loading &&
      <ul>
        {props.searchedTodos.map(props.renderTodos || props.children)}
      </ul>}
    </section>
  );
}

export { TodoList };
