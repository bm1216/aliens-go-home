import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore } from "redux";
import reducer from './reducers'
import './index.css';
import {Provider} from 'react-redux'
import Game from "./containers/Game";



const store = createStore(
  reducer, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById("root")
)
;
