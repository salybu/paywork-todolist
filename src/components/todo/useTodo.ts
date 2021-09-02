import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  deleteTodo as deleteTodoStart,
  editTodo as editTodoStart,
  getTodos as getTodosStart,
  selectTodos,
  toggleCheckTodos as toggleCheckStart,
} from 'redux/modules/todos';

const useTodo = () => {
  const dispatch = useDispatch(); // action dispatch 에 사용
  const { todos } = useSelector(selectTodos); // redux 의 전역상태인 todo 목록 (RootState 의 TodosState 의 todos)
  const [input, setInput] = useState<string>(); // todo text input 관련 state

  // todo text 입력값 바뀔 때, input state 를 갱신하는 메소드
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  // todo text 입력 후 추가버튼 클릭 시, addTodo action dispatch 하는 메소드
  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault(); // form submit 에 설정된 기본동작 막음
    dispatch(addTodo({ content: input }));
    setInput(''); // input state clear
  };

  // 기존 todo text 수정 후 수정버튼 클릭 시, editTodo action dispatch 하는 메소드
  const editTodo = (id: string, content: string): void => {
    dispatch(editTodoStart(id, content));
  };

  // 기존 todo 삭제버튼 클릭 시, deleteTodo action dispatch 하는 메소드
  const deleteTodo = (id: string): void => {
    dispatch(deleteTodoStart(id));
  };

  // 모든 todo 를 조회하는 getTodos action dispatch 하는 메소드
  const getTodos = useCallback(() => {
    dispatch(getTodosStart());
  }, [dispatch]);

  // useTodo Hook 최초 생성 시, getTodos() 호출
  useEffect(() => {
    getTodos();
  }, []);

  // 기존 todo 의 완료 체크박스(버튼) 토글 시, toggleCheck action dispatch 하는 메소드
  const toggleCheck = (id: string, isCheck: boolean) => {
    dispatch(toggleCheckStart({ id, isCheck }));
  };

  return { todos, input, toggleCheck, getTodos, handleChange, handleSubmit, editTodo, deleteTodo };
};

export default useTodo;
