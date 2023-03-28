import React from 'react';
import ReactDOM, {render} from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';

const loader = document.querySelector('.loader');
const hideLoader = () => loader.classList.add('loader--hide');


ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App hideLoader={hideLoader} />
        </Provider>
    </React.StrictMode>,
    document.getElementById('app')
);

