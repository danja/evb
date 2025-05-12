import { describe, it, expect } from 'vitest';
import { EventBus } from '../../src/event-bus.js';

describe('EventBus', () => {
    it('should unsubscribe and remove event if no listeners remain', () => {
        const bus = new EventBus();
        const cb = () => { };
        const off = bus.on('foo', cb);
        expect(bus.listeners.has('foo')).toBe(true);
        off();
        expect(bus.listeners.has('foo')).toBe(false);
    });

    it('should only call remaining listeners after one is unsubscribed', () => {
        const bus = new EventBus();
        let calledA = false, calledB = false;
        const a = () => { calledA = true; };
        const b = () => { calledB = true; };
        const offA = bus.on('bar', a);
        bus.on('bar', b);
        offA();
        bus.emit('bar');
        expect(calledA).toBe(false);
        expect(calledB).toBe(true);
    });

    it('should not break if a listener throws', () => {
        const bus = new EventBus();
        let called = false;
        bus.on('err', () => { throw new Error('fail'); });
        bus.on('err', () => { called = true; });
        expect(() => bus.emit('err')).not.toThrow();
        expect(called).toBe(true);
    });

    it('removeAllListeners(event) removes all listeners for that event', () => {
        const bus = new EventBus();
        bus.on('baz', () => { });
        bus.removeAllListeners('baz');
        expect(bus.listeners.has('baz')).toBe(false);
    });

    it('removeAllListeners() clears all events', () => {
        const bus = new EventBus();
        bus.on('a', () => { });
        bus.on('b', () => { });
        bus.removeAllListeners();
        expect(bus.listeners.size).toBe(0);
    });
});
