import { TodoCreate, TodoList } from '.';

const TodoContainer = () => {
  return (
    <main className='container'>
      <TodoCreate />
      <TodoList />
    </main>
  );
};

export default TodoContainer;
