function createSetter(field) {
    return function (state, value) {
        return {
            ...state,
            [field]: value
        };
    };
}

function createSetterFromAction(field) {
    let setter = createSetter(field);

    return function (state, action) {
        return setter(state, action[field]);
    };
}

function createTypedReducer(type, reducer) {
    return function (state, action) {
        if (action.type === type) {
            return reducer(state, action);
        }

        return state;
    };
}

function composeReducers(...reducers) {
    return function (state, action) {
        return reducers.reduce((state, reducer) => reducer(state, action), state);
    };
}

function createDefaultReducer(reducer, defaultState) {
    return function (state = defaultState, action) {
        return reducer(state, action);
    };
}

const setLoading = createSetterFromAction('loading');
const setError = createSetterFromAction('error');

const feedLoadingReducer = createTypedReducer('FEED_LOADING', setLoading);
const feedErrorReducer = createTypedReducer('FEED_ERROR', setError);

const feedReducerReducer = composeReducers(
    feedLoadingReducer,
    feedErrorReducer
);

export const feedReducer = createDefaultReducer(feedReducerReducer, {
    cards: [],
    next: {}
});
//
//export function feedReducer(state, action) {
//    if (!state) {
//        return {
//            cards: [],
//            next: {}
//        };
//    }
//
//    state = feedReducerReducer(state, action);
//
//    //if (action.type === 'FEED_APPEND_CARDS') {
//    //    return {
//    //        ...state,
//    //        cards: state.cards.concat(action.cards),
//    //        next: action.next
//    //    };
//    //}
//    //
//    //if (action.type === 'FEED_RESET') {
//    //    return {
//    //        ...state,
//    //        cards: [],
//    //        next: {},
//    //        error: null
//    //    };
//    //}
//
//    return state;
//}
