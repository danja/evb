import { combineReducers, createAction } from '../../src/state-utils.js'

describe('combineReducers', () => {
    it('should combine multiple reducers', () => {
        const countReducer = (state = 0, action) => {
            if (action.type === 'INC') return state + 1
            return state
        }
        const flagReducer = (state = false, action) => {
            if (action.type === 'TOGGLE') return !state
            return state
        }
        const rootReducer = combineReducers({ count: countReducer, flag: flagReducer })
        let state = rootReducer(undefined, { type: '@@INIT' })
        expect(state).toEqual({ count: 0, flag: false })
        state = rootReducer(state, { type: 'INC' })
        expect(state).toEqual({ count: 1, flag: false })
        state = rootReducer(state, { type: 'TOGGLE' })
        expect(state).toEqual({ count: 1, flag: true })
    })
})

describe('createAction', () => {
    it('should create an action creator', () => {
        const setFoo = createAction('SET_FOO')
        expect(setFoo('bar')).toEqual({ type: 'SET_FOO', payload: 'bar' })
    })
}) 