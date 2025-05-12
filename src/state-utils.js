// General-purpose state utilities

/**
 * Combine multiple reducers into one (Redux-style)
 * @template S State object type
 * @template A Action object type
 * @param {Object<string, function(S, A): S>} reducers - An object mapping keys to reducer functions
 * @returns {function(S=, A): S} A root reducer function
 */
export function combineReducers(reducers) {
    return (state = {}, action) => {
        const nextState = {}
        let hasChanged = false
        for (const key in reducers) {
            const reducer = reducers[key]
            const previousStateForKey = state[key]
            const nextStateForKey = reducer(previousStateForKey, action)
            nextState[key] = nextStateForKey
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        return hasChanged ? nextState : state
    }
}

/**
 * Simple action creator
 * @template T
 * @param {string} type - The action type
 * @returns {function(T): {type: string, payload: T}} An action creator function
 */
export function createAction(type) {
    return (payload) => ({ type, payload })
}