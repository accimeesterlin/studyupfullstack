import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import './index.scss';
import Route from './routes/routes';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers/index';

const middleware = applyMiddleware(promise(), logger);
const store = createStore(reducers, middleware);


ReactDOM.render(<Provider store = {store}>
    <Route />
</Provider>, document.getElementById('root'));
registerServiceWorker();
