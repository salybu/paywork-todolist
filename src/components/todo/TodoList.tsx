import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { RiDeleteBinFill } from 'react-icons/ri';
import { getTodos } from 'redux/modules/todos';
import { RootState, Todos } from 'type';

const TodoList = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const todos = useSelector<RootState, Todos[]>((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsCheck(!isCheck);
    console.log(todos);
  };

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [dispatch]);

  return (
    <ul className='todo_list'>
      {todos.map((todo) => (
        <li>
          <div>
            <button onClick={handleClick}>{todo.isCheck ? <AiFillCheckCircle /> : <AiOutlineCheckCircle />}</button>
            <p className={todo.isCheck ? 'todo_done' : ''}>{todo.content}</p>
          </div>
          <button>
            <RiDeleteBinFill />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
