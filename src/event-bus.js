// Simple event bus for pub/sub communication
export class EventBus {
    constructor() {
        this.listeners = new Map()
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Event handler function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set())
        }
        this.listeners.get(event).add(callback)
        // Return unsubscribe function
        return () => {
            const callbacks = this.listeners.get(event)
            if (callbacks) {
                callbacks.delete(callback)
                if (callbacks.size === 0) {
                    this.listeners.delete(event)
                }
            }
        }
    }

    /**
     * Emit an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data) {
        // Optionally log or handle errors here
        const callbacks = this.listeners.get(event)
        if (callbacks) {
            callbacks.forEach(callback => {
                try {
                    callback(data)
                } catch (error) {
                    // Optionally handle listener errors
                    // console.error(`Error in event listener for "${event}":`, error)
                }
            })
        }
    }

    /**
     * Remove all listeners for an event or all events
     * @param {string} [event] - Event name (optional, removes all if not specified)
     */
    removeAllListeners(event) {
        if (event) {
            this.listeners.delete(event)
        } else {
            this.listeners.clear()
        }
    }
}

// Singleton instance for convenience
export const eventBus = new EventBus()

// Direct API for convenience (for legacy/common usage)
export const on = eventBus.on.bind(eventBus)
export const off = (event, callback) => {
    const callbacks = eventBus.listeners.get(event)
    if (callbacks) {
        callbacks.delete(callback)
        if (callbacks.size === 0) {
            eventBus.listeners.delete(event)
        }
    }
}
export const emit = eventBus.emit.bind(eventBus)

// For testability: reset all listeners
export const _reset = () => eventBus.removeAllListeners()

// Usage:
// import { eventBus, on, off, emit, _reset } from 'evb/src/event-bus.js'
// const unsubscribe = on('my:event', data => { ... })
// emit('my:event', { foo: 'bar' })
// off('my:event', unsubscribe)