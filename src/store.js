// General-purpose Redux-like store with event bus integration
import { eventBus } from './event-bus.js'
import { EVENTS } from './event-constants.js'

/**
 * Create a simple store with reducer and initial state
 * Emits EVENTS.STATE_CHANGED on every dispatch
 */
export function createStore(reducer, initialState) {
    let state
    let listeners = new Set()

    const getState = () => state

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach(listener => listener(state))
        eventBus.emit(EVENTS.STATE_CHANGED, { action, state })
        return action
    }

    const subscribe = (listener) => {
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }

    // Initialize store with an action to establish initial state
    state = reducer(initialState, { type: '@@INIT' })

    return {
        getState,
        dispatch,
        subscribe
    }
}

// Usage:
// import { createStore } from 'evb/src/store.js'
// const store = createStore(reducer)
// store.subscribe(state => { ... })
// store.dispatch({ type: 'ACTION', payload: ... }) 