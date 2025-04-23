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

// Usage:
// import { eventBus } from 'evb/src/event-bus.js'
// const unsubscribe = eventBus.on('my:event', data => { ... })
// eventBus.emit('my:event', { foo: 'bar' })
// unsubscribe() // to remove listener 