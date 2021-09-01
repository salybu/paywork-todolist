import React from 'react';
import { TodoCreate, TodoList } from '.';
import useTodo from './useTodo';

const TodoContainer = () => {
  const { todos, toggleCheck, getTodos } = useTodo();

  return (
    <main className='container'>
      <TodoCreate />
      <TodoList todos={todos} toggleCheck={toggleCheck} getTodos={getTodos} />
    </main>
  );
};

export default React.memo(TodoContainer);
