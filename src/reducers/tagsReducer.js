export function tagsReducer(state, action) {
    if (!state) {
        return {
            current: 'kanony'
        };
    }

    if (action.type === 'SET_TAG') {
        return {
            ...state,
            current: action.tag
        };
    }

    return state;
}
