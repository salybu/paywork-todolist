import { all } from 'redux-saga/effects';
import { todosSaga } from './todos';

export default function* rootSaga() {
  yield all([todosSaga()]);
}
