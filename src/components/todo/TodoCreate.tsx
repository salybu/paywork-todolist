import React from 'react';
import { useTodo } from '.';

const TodoCreate: React.FC = (): JSX.Element => {
  const { input, handleChange, handleSubmit } = useTodo();

  return (
    <form className='todo_form' onSubmit={handleSubmit}>
      <div>
        <input placeholder='Write down your Todo!' onChange={handleChange} value={input}></input>
        <button>Add</button>
      </div>
    </form>
  );
};

export default React.memo(TodoCreate);
