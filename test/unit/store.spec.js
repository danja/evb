import { createStore } from '../../src/store.js'
import { eventBus } from '../../src/event-bus.js'
import { EVENTS } from '../../src/event-constants.js'

describe('createStore', () => {
    let store
    let reducer

    beforeEach(() => {
        reducer = (state = { count: 0 }, action) => {
            switch (action.type) {
                case 'INCREMENT':
                    return { ...state, count: state.count + 1 }
                case 'SET':
                    return { ...state, count: action.payload }
                default:
                    return state
            }
        }
        store = createStore(reducer)
        eventBus.removeAllListeners(EVENTS.STATE_CHANGED) // cleanup
    })

    it('should initialize with default state', () => {
        expect(store.getState()).toEqual({ count: 0 })
    })

    it('should update state on dispatch', () => {
        store.dispatch({ type: 'INCREMENT' })
        expect(store.getState().count).toBe(1)
        store.dispatch({ type: 'SET', payload: 5 })
        expect(store.getState().count).toBe(5)
    })

    it('should notify subscribers on state change', () => {
        const listener = jasmine.createSpy('listener')
        store.subscribe(listener)
        store.dispatch({ type: 'INCREMENT' })
        expect(listener).toHaveBeenCalledWith({ count: 1 })
    })

    it('should allow unsubscribing listeners', () => {
        const listener = jasmine.createSpy('listener')
        const unsubscribe = store.subscribe(listener)
        unsubscribe()
        store.dispatch({ type: 'INCREMENT' })
        expect(listener).not.toHaveBeenCalled()
    })

    it('should emit EVENTS.STATE_CHANGED on dispatch', (done) => {
        const handler = (payload) => {
            expect(payload.action.type).toBe('INCREMENT')
            expect(payload.state.count).toBe(1)
            eventBus.removeAllListeners(EVENTS.STATE_CHANGED)
            done()
        }
        eventBus.on(EVENTS.STATE_CHANGED, handler)
        store.dispatch({ type: 'INCREMENT' })
    })
}) 