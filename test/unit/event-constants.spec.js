import { EVENTS } from '../../src/event-constants.js'

describe('EVENTS', () => {
    it('should contain expected event keys', () => {
        expect(EVENTS).toEqual(jasmine.objectContaining({
            ERROR_OCCURRED: jasmine.any(String),
            APP_INITIALIZED: jasmine.any(String),
            STATE_CHANGED: jasmine.any(String),
            ENDPOINT_ADDED: jasmine.any(String),
            NOTIFICATION_SHOW: jasmine.any(String)
        }))
    })

    it('should have correct values for some events', () => {
        expect(EVENTS.ERROR_OCCURRED).toBe('error:occurred')
        expect(EVENTS.APP_INITIALIZED).toBe('app:initialized')
        expect(EVENTS.STATE_CHANGED).toBe('state:changed')
    })
}) 