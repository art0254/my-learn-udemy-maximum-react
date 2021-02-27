import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer,
});

const logger = (store) => {
  return (next) => {
    // ตัวที่จะทำงาน 1
    return (action) => {
      // ตัวที่จะทำงาน 2 จะได้ค่าบางอย่างจาก redux มาไว้ก่อน
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      console.log('[Midlewware next state]', store.getState());
      return result; // สั่งให้งานตัวที่ 2 -> มันก็จะย้อนไปเรื่อยๆ โดยทำจากข้างในนี้ก่อน
    };
  };
};
const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger))
);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
