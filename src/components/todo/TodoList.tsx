import { useState } from 'react';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';

const TodoList = () => {
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleClick = () => {
    setIsComplete(!isComplete);
  };

  return (
    <ul className='todo_list'>
      <li>
        <div>
          <button onClick={handleClick}>{isComplete ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}</button>
          <p className={isComplete ? 'todo_done' : ''}>과제</p>
        </div>
        <button>
          <RiDeleteBinFill />
        </button>
      </li>
    </ul>
  );
};

export default TodoList;
