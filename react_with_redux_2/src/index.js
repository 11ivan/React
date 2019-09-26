import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//REDUX
import { Provider } from 'react-redux';
import rootReducer from './redux/root-reducer';
import { createStore } from 'redux';

let store = createStore(rootReducer);
//console.log('CREATED STORE: ', store);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
