import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { addTodoReqType, RootState, Todo, TodoId, TodosState, toggleCheckReqType } from 'type';
import TodoService from 'components/todo/TodoService';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const prefix = 'paywork-todolist/todo';

export const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', { prefix });

const reducer = handleActions<TodosState, Todo[]>(
  {
    START: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      todos: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;
export const selectTodos = (state: RootState) => state.todos;

// saga
export const { getTodos, addTodos, deleteTodos, toggleCheckTodos } = createActions('GET_TODOS', 'ADD_TODOS', 'DELETE_TODOS', 'TOGGLE_CHECK_TODOS', { prefix });

function* getTodosSaga() {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.getTodos);
    yield put(success(todos));
    console.log(todos, '      here in todos reducer getTodosSaga');
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* toggleIsCheckTodosSaga(action: Action<toggleCheckReqType>) {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.toggleIsCheckTodos, action.payload.id, action.payload.isCheck);
    yield put(success(todos));
    // console.log(todos, '      here in todos reducer toggleIsCheckTodosSaga');
  } catch (error) {}
}

function* addTodosSaga(action: Action<addTodoReqType>) {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.addTodo, action.payload.content);
    yield put(success(todos));
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* deleteTodosSaga(action: Action<TodoId>) {
  try {
    console.log('deleteTodosSaga action      ', action);
    yield put(start());
    const todos: Todo[] = yield call(TodoService.deleteTodo, action.payload.id);
    // yield put(success(todos));
  } catch (error) {}
}

export function* todosSaga() {
  yield takeLatest(`${prefix}/GET_TODOS`, getTodosSaga);
  yield takeEvery(`${prefix}/TOGGLE_CHECK_TODOS`, toggleIsCheckTodosSaga);
  yield takeLatest(`${prefix}/ADD_TODOS`, addTodosSaga);
  yield takeLatest(`${prefix}/DELETE_TODOS`, deleteTodosSaga);
}
