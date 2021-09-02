import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { addTodoReqType, editTodoReqType, RootState, Todo, TodoId, TodosState, toggleCheckReqType } from 'type';
import TodoService from 'components/todo/TodoService';

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const prefix = 'paywork-todolist/todo'; // 고유한 액션 type 생성을 위한 prefix

export const { start, success, fail } = createActions<string>('START', 'SUCCESS', 'FAIL', { prefix }); // 액션 생성 함수 export

// input (state: TodosState, action: Todo[](SUCCESS Type) or Error(FAIL Type))
const reducer = handleActions<TodosState, Todo[]>( // 액션 type 별 리듀서(처리 로직) 생성
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

export const selectTodos = (state: RootState) => state.todos; // useSelector Hook 사용 시, RootState 에서 todosState 만을 선택

// saga
export const { getTodos, addTodo, deleteTodo, editTodo, toggleCheckTodos } = createActions<string>(
  'GET_TODOS',
  'ADD_TODO',
  'DELETE_TODO',
  'EDIT_TODO',
  'TOGGLE_CHECK_TODOS',
  { prefix },
); // saga 함수 dispatch 하기 위한 액션 생성 함수 export

// 모든 Todo 조회하는 API 호출(비동기) 후, return 값을 redux todos state 에 넣어주는 제너레이터
function* getTodosSaga() {
  try {
    yield put(start()); // dispatch start action
    const todos: Todo[] = yield call(TodoService.getTodos); // 비동기 API 호출 메소드 TodoService.getTodos 호출
    yield put(success(todos)); // return 된 todos 를 action payload 로 하여, dispatch success action
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

// 기존 todo 의 check 여부를 변경하는 API 호출(비동기) 후, return 값을 redux todos state 에 넣어주는 제너레이터
function* toggleIsCheckTodosSaga(action: Action<toggleCheckReqType>) {
  try {
    yield put(start()); // dispatch start action
    const todos: Todo[] = yield call(TodoService.toggleIsCheckTodos, action.payload.id, action.payload.isCheck); // 비동기 API 호출 메소드 toggleIsCheckTodos 호출
    yield put(success(todos)); // return 된 todos 를 action payload 로 하여, dispatch success action
  } catch (error) {}
}

// 새로운 todo 를 추가하는 API 호출(비동기) 후, return 값을 redux todos state 에 넣어주는 제너레이터
function* addTodoSaga(action: Action<addTodoReqType>) {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.addTodo, action.payload.content);
    yield put(success(todos));
  } catch (error) {
    // yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

// 기존 todo 를 삭제하는 API 호출(비동기) 후, return 값을 redux todos state 에 넣어주는 제너레이터
function* deleteTodoSaga(action: Action<TodoId>) {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.deleteTodo, action.payload.id);
    yield put(success(todos));
  } catch (error) {}
}

// 기존 todo 를 수정하는 API 호출(비동기) 후, return 값을 redux todos state 에 넣어주는 제너레이터
function* editTodoSaga(action: Action<editTodoReqType>) {
  try {
    yield put(start());
    const todos: Todo[] = yield call(TodoService.editTodo, action.payload.id, action.payload.content);
    yield put(success(todos));
  } catch (error) {}
}

// saga action type 과 saga 함수를 연결하는 todosSaga export
export function* todosSaga() {
  yield takeLatest(`${prefix}/GET_TODOS`, getTodosSaga); // 들어오는 해당 action type 중 가장 마지막으로 들어온 type 에 대해 saga 함수 실행
  yield takeEvery(`${prefix}/TOGGLE_CHECK_TODOS`, toggleIsCheckTodosSaga); // 들어오는 모든 해당 action type 에 대해 saga 함수 실행
  yield takeEvery(`${prefix}/ADD_TODO`, addTodoSaga);
  yield takeEvery(`${prefix}/DELETE_TODO`, deleteTodoSaga);
  yield takeEvery(`${prefix}/EDIT_TODOS`, editTodoSaga);
}
