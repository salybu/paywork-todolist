import React, { useState } from 'react';
import { createPortal } from 'react-dom';

export interface IEditTodo {
  id: string;
  content: string;
  closeModal: () => void;
  editTodo: (id: string, content: string) => void;
}

// 기존 Todo content 수정 시에만 사용하는 Modal
const Modal: React.FC<IEditTodo> = ({ id, content, closeModal, editTodo }): JSX.Element => {
  const [input, setInput] = useState<string>(content); // todo text input 관련 state, initial 값은 기존 todo 의 content

  // todo text 입력값 바뀔 때, input state 를 갱신하는 메소드
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // todo text 입력 후 수정버튼 클릭 시, 호출되는 메소드
  const handleClick = (e: React.FormEvent) => {
    e.preventDefault();
    editTodo(id, input); // useTodo() 에서 넘겨받은 editTodo 호출
    closeModal(); // 모달창 닫기
  };

  // <div id="modal"> 내부에 해당 JSX Element 를 삽입
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
