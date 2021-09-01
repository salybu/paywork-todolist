import React from 'react';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import { Todo } from 'type';

export interface ITodoItem {
  todo: Todo;
  toggleCheck: (id: string, isCheck: boolean) => void;
}

const TodoItem: React.FC<ITodoItem> = ({ todo, toggleCheck }) => {
  return (
    <li>
      <div>
        <button
          type='button'
          onClick={() => {
            toggleCheck(todo.id, !todo.isCheck);
          }}
        >
          {todo.isCheck ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}
        </button>
        <p className={todo.isCheck ? 'todo_done' : ''}>{todo.content}</p>
      </div>
      <button>
        <RiDeleteBinFill />
      </button>
    </li>
  );
};

export default React.memo(TodoItem);
