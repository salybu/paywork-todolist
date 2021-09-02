import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodos, deleteTodos, editTodos, getTodos as getTodosStart, selectTodos, toggleCheckTodos as toggleCheckStart } from 'redux/modules/todos';

const useTodo = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector(selectTodos);
  const [input, setInput] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    dispatch(addTodos({ content: input }));
    setInput('');
  };

  const editTodo = (id: string, content: string): void => {
    dispatch(editTodos(id, content));
  };

  const deleteTodo = (id: string): void => {
    dispatch(deleteTodos(id));
  };

  const getTodos = useCallback(() => {
    dispatch(getTodosStart());
  }, [dispatch]);

  useEffect(() => {
    getTodos();
  }, []);

  const toggleCheckTodos = useCallback(
    (id: string, isCheck: boolean) => {
      dispatch(toggleCheckStart({ id, isCheck }));
    },
    [dispatch],
  );

  const toggleCheck = (id: string, isCheck: boolean) => {
    toggleCheckTodos(id, isCheck);
  };

  return { todos, input, toggleCheck, getTodos, handleChange, handleSubmit, editTodo, deleteTodo };
};

export default useTodo;
