import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export interface IEditTodo {
  id: string;
  content: string;
  closeModal: () => void;
}

const Modal: React.FC<IEditTodo> = ({ id, content, closeModal }) => {
  const [input, setInput] = useState<string>(content);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    closeModal();
  };

  return createPortal(
    <div className='dim'>
      <div className='modal_content'>
        <button className='close_modal' onClick={closeModal}>
          X
        </button>
        <h3>수정하기</h3>
        <form>
          <input value={input} onChange={handleChange} />
          <button onClick={handleClick}>수정</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal') as Element,
  );
};

export default Modal;
