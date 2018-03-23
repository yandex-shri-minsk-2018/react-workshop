import React, {Component} from 'react';
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {mainReducer} from './reducers/mainReducer';
import './App.css';

//import {Demo} from './Demo';
import {Feed} from './components/Feed';
//import {Hello} from './components/Hello';

function middleware({dispatch, getState}) {
    return next => action => {
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }

        return next(action);
    };
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
    mainReducer,
    undefined,
    composeEnhancers(
        applyMiddleware(middleware)
    )
);

// let store = createStore(
//     reducer,
//     undefined,
//     composeEnhancers(
//         applyMiddleware(
//             middleware
//         )
//     )
// );

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Feed />
            </Provider>
        );
    }
}

export default App;
