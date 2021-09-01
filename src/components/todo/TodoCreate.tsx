import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodos } from 'redux/modules/todos';

const TodoCreate = () => {
  const [input, setInput] = useState<string>();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addTodos({ content: input }));
    setInput('');
  };

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
