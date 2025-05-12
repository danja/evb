import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createStore } from '../../src/store.js';

describe('createStore', () => {
    let store;
    const reducer = (state = { count: 0 }, action) => {
        switch (action.type) {
            case 'inc':
                return { ...state, count: state.count + 1 };
            case 'set':
                return { ...state, count: action.payload };
            default:
                return state;
        }
    };

    beforeEach(() => {
        store = createStore(reducer, { count: 0 });
    });

    it('should initialize with reducer and initial state', () => {
        expect(store.getState()).toEqual({ count: 0 });
    });

    it('should update state via dispatch', () => {
        store.dispatch({ type: 'inc' });
        expect(store.getState()).toEqual({ count: 1 });
        store.dispatch({ type: 'set', payload: 5 });
        expect(store.getState()).toEqual({ count: 5 });
    });

    it('should notify listeners on dispatch', () => {
        const listener = vi.fn();
        store.subscribe(listener);
        store.dispatch({ type: 'inc' });
        expect(listener).toHaveBeenCalledWith({ count: 1 });
    });

    it('should unsubscribe listeners', () => {
        const listener = vi.fn();
        const unsubscribe = store.subscribe(listener);
        unsubscribe();
        store.dispatch({ type: 'inc' });
        expect(listener).not.toHaveBeenCalled();
    });
});
