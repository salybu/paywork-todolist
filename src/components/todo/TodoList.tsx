import React from 'react';
import { TodoItem, useTodo } from '.';

const TodoList = () => {
  const { todos, toggleCheck, editTodo, deleteTodo } = useTodo();

  return (
    <ul className='todo_list'>
      {todos.map((todo) => (
        <TodoItem todo={todo} toggleCheck={toggleCheck} deleteTodo={deleteTodo} editTodo={editTodo} />
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
