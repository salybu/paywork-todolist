import { all } from 'redux-saga/effects';
import { todosSaga } from './todos';

export default function* rootSaga() {
  yield all([todosSaga()]); // module 별로 생성한 saga 를 배열의 형태로 인자로 넣어, 미들웨어가 각 saga 를 병행 실행하도록 하고, complete 될 때까지 기다림
}
