import React, { useEffect } from 'react';
import { Todo } from 'type';
import TodoItem from './TodoItem';

export interface ITodoList {
  todos: Todo[];
  toggleCheck: (id: string, isCheck: boolean) => void;
  getTodos: () => void;
}

const TodoList: React.FC<ITodoList> = ({ todos, toggleCheck, getTodos }) => {
  useEffect(() => {
    if (todos.length == 0) {
      getTodos();
    }
    console.log(todos);
  }, []);

  return (
    <ul className='todo_list'>
      {todos.map((todo) => (
        <TodoItem todo={todo} toggleCheck={toggleCheck} />
      ))}
    </ul>
  );
};

export default React.memo(TodoList);
