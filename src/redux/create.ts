import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducer, rootSaga } from './modules';

const create = () => {
  const sagaMiddleware = createSagaMiddleware();
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
  sagaMiddleware.run(rootSaga);
  return store;
};

export default create;
