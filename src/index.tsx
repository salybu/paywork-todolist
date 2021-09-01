import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'styles/GlobalStyles.scss';
import App from './App';
import create from 'redux/create';

const store = create();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
