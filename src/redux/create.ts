import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer, rootSaga } from './modules';

const create = () => {
  const sagaMiddleware = createSagaMiddleware(); // saga middleware 생성

  // store 생성 (option: reducer, initialState, middleware)
  const store = createStore(
    reducer,
    {
      todos: {
        todos: [],
        loading: false,
        error: null,
      },
    },
    applyMiddleware(sagaMiddleware),
  );

  sagaMiddleware.run(rootSaga); // saga middleware 가 rootSaga 를 실행함
  return store;
};

export default create;
