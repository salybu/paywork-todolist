import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'styles/GlobalStyles.scss';
import App from './App';
import create from 'redux/create';

const store = create(); // store 생성 및 관련 로직 실행 후, store 리턴

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
