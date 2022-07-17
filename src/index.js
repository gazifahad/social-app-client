import react from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';

import App from './App';
import './index.css'
import { Provider } from 'react-redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
<BrowserRouter>
<Provider store={store}>
<App />
</Provider>
</BrowserRouter>
,document.getElementById('root'));

