import React from 'react';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { Todo } from 'type';
import Modal from 'components/Modal';
import useModal from 'components/useModal';

export interface ITodoItem {
  todo: Todo;
  toggleCheck: (id: string, isCheck: boolean) => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<ITodoItem> = ({ todo, toggleCheck, deleteTodo }) => {
  const { isVisible, openModal, closeModal } = useModal();

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
      <div>
        <button onClick={openModal}>
          <FiEdit />
        </button>
        <button
          onClick={() => {
            deleteTodo(todo.id);
          }}
        >
          <RiDeleteBinFill />
        </button>
      </div>
      {isVisible && <Modal id={todo.id} content={todo.content} closeModal={closeModal} />}
    </li>
  );
};

export default React.memo(TodoItem);
