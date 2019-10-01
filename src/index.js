import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";

import { positions, Provider as Alertprovider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import store from "./store/store";

import App from './App';

const options = {
    timeout: 5000,
    position: positions.TOP_RIGHT
};


ReactDOM.render(
    <Provider store={store}>
        <Alertprovider template={AlertTemplate} {...options}>
            <App />
        </Alertprovider>
    </Provider>,
    document.getElementById('root')
);

module.hot.accept();
