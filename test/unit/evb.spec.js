import { describe, it, expect, vi, beforeEach } from 'vitest';
import { on, off, emit, _reset } from '../../src/index.js';

describe('evb event bus', () => {
    beforeEach(() => {
        // Remove all listeners before each test
        if (_reset) _reset();
    });

    it('should register and emit events', () => {
        const handler = vi.fn();
        on('test-event', handler);
        emit('test-event', 42);
        expect(handler).toHaveBeenCalledWith(42);
    });

    it('should not call handler after off', () => {
        const handler = vi.fn();
        on('test-event', handler);
        off('test-event', handler);
        emit('test-event', 123);
        expect(handler).not.toHaveBeenCalled();
    });

    it('should support multiple handlers for the same event', () => {
        const handler1 = vi.fn();
        const handler2 = vi.fn();
        on('multi', handler1);
        on('multi', handler2);
        emit('multi', 'data');
        expect(handler1).toHaveBeenCalledWith('data');
        expect(handler2).toHaveBeenCalledWith('data');
    });

    it('should not fail if off is called for a non-existent handler', () => {
        const handler = vi.fn();
        expect(() => off('nope', handler)).not.toThrow();
    });

    it('should not call handlers for other events', () => {
        const handler = vi.fn();
        on('foo', handler);
        emit('bar', 'baz');
        expect(handler).not.toHaveBeenCalled();
    });
});
