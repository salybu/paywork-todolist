import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTodos as getTodosStart, selectTodos, toggleCheckTodos as toggleCheckStart } from 'redux/modules/todos';

const useTodo = () => {
  //   const todos = useSelector<RootState, Todos[]>((state) => state.todos.todos);
  const { todos } = useSelector(selectTodos);
  const dispatch = useDispatch();

  const getTodos = useCallback(() => {
    dispatch(getTodosStart());
  }, [dispatch]);

  const toggleCheckTodos = useCallback(
    (id: string, isCheck: boolean) => {
      dispatch(toggleCheckStart({ id, isCheck }));
    },
    [dispatch],
  );

  const toggleCheck = (id: string, isCheck: boolean) => {
    toggleCheckTodos(id, isCheck);
    console.log(todos);
  };

  return { todos, toggleCheck, getTodos };
};

export default useTodo;
