import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux';
import rootReducers from './reducers/rootReducers.js';

const store = createStore(
    rootReducers, 
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(ReduxThunk),

);



ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>


    , document.getElementById('root'));
registerServiceWorker();
