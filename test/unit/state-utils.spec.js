import { describe, it, expect } from 'vitest';
import { combineReducers, createAction } from '../../src/state-utils.js';

describe('combineReducers', () => {
    it('should combine multiple reducers', () => {
        const countReducer = (state = 0, action) => {
            if (action.type === 'inc') return state + 1;
            return state;
        };
        const textReducer = (state = '', action) => {
            if (action.type === 'set') return action.payload;
            return state;
        };
        const rootReducer = combineReducers({ count: countReducer, text: textReducer });
        let state = rootReducer(undefined, { type: '@@INIT' });
        expect(state).toEqual({ count: 0, text: '' });
        state = rootReducer(state, { type: 'inc' });
        expect(state).toEqual({ count: 1, text: '' });
        state = rootReducer(state, { type: 'set', payload: 'hello' });
        expect(state).toEqual({ count: 1, text: 'hello' });
    });

    it('should return the same state object if nothing changes', () => {
        const noopReducer = (state = 1, action) => state;
        const rootReducer = combineReducers({ a: noopReducer });
        const state = { a: 1 };
        const result = rootReducer(state, { type: 'unknown' });
        expect(result).toBe(state);
    });
});

describe('createAction', () => {
    it('should create an action creator', () => {
        const setAction = createAction('set');
        expect(setAction('foo')).toEqual({ type: 'set', payload: 'foo' });
    });
});
