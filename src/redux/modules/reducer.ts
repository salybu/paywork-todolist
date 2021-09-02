import { combineReducers } from 'redux';
import { todos } from '.';

// module 별로 생성한 리듀서를 하나의 root 리듀서로 만듬
const reducer = combineReducers({
  todos,
});

export default reducer;
