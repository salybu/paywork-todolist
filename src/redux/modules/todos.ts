import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Todos, TodosState } from 'type';
import TodoService from 'components/todo/TodoService';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const prefix = 'paywork-todolist/todo';

export const { start, success, fail } = createActions('START', 'SUCCESS', 'FAIL', { prefix });

const reducer = handleActions<TodosState, Todos[]>(
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

// saga
export const { getTodos, addTodos, deleteTodos } = createActions('GET_TODOS', 'ADD_TODOS', 'DELETE_TODOS', { prefix });

function* getTodosSaga() {
  try {
    yield put(start());
    const todos: Todos[] = yield call(TodoService.getTodos);
    yield put(success(todos));
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* addTodosSaga(action: Action<Todos[]>) {
  try {
    yield put(start());
    const todos: Todos[] = yield call(TodoService.getTodos);
    yield put(success(todos));
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

export function* todosSaga() {
  yield takeLatest(`${prefix}/GET_TODOS`, getTodosSaga);
}
