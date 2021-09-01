import React from 'react';
import { TodoCreate, TodoList } from '.';

const TodoContainer: React.FC = (): JSX.Element => {
  return (
    <main className='container'>
      <TodoCreate />
      <TodoList />
    </main>
  );
};

export default React.memo(TodoContainer);
