import { eventBus, EventBus } from '../../src/event-bus.js'

describe('EventBus', () => {
    let bus

    beforeEach(() => {
        bus = new EventBus()
    })

    it('should subscribe and emit events', () => {
        const handler = jasmine.createSpy('handler')
        bus.on('test:event', handler)
        bus.emit('test:event', 42)
        expect(handler).toHaveBeenCalledWith(42)
    })

    it('should unsubscribe handlers', () => {
        const handler = jasmine.createSpy('handler')
        const unsubscribe = bus.on('test:event', handler)
        unsubscribe()
        bus.emit('test:event', 42)
        expect(handler).not.toHaveBeenCalled()
    })

    it('should remove all listeners for an event', () => {
        const handler1 = jasmine.createSpy('handler1')
        const handler2 = jasmine.createSpy('handler2')
        bus.on('test:event', handler1)
        bus.on('test:event', handler2)
        bus.removeAllListeners('test:event')
        bus.emit('test:event', 42)
        expect(handler1).not.toHaveBeenCalled()
        expect(handler2).not.toHaveBeenCalled()
    })

    it('should remove all listeners for all events', () => {
        const handler1 = jasmine.createSpy('handler1')
        const handler2 = jasmine.createSpy('handler2')
        bus.on('event1', handler1)
        bus.on('event2', handler2)
        bus.removeAllListeners()
        bus.emit('event1', 1)
        bus.emit('event2', 2)
        expect(handler1).not.toHaveBeenCalled()
        expect(handler2).not.toHaveBeenCalled()
    })

    it('should export a singleton eventBus', () => {
        const handler = jasmine.createSpy('handler')
        eventBus.on('singleton:event', handler)
        eventBus.emit('singleton:event', 123)
        expect(handler).toHaveBeenCalledWith(123)
        eventBus.removeAllListeners('singleton:event') // cleanup
    })
}) 