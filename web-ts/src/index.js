import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Store from './Store';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = new Store();

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
