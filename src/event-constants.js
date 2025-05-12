// General-purpose event constants
// Extend or override as needed in your app
/**
 * Common event name constants for use with the event bus and application modules.
 * @namespace EVENTS
 * @property {string} ERROR_OCCURRED - Error event
 * @property {string} APP_INITIALIZED - Application initialized
 * @property {string} SHARE_RECEIVED - Share received
 * @property {string} STATE_CHANGED - State changed
 * @property {string} GRAPH_CREATED - Dataset graph created
 * @property {string} GRAPH_UPDATED - Dataset graph updated
 * @property {string} GRAPH_DELETED - Dataset graph deleted
 * @property {string} QUAD_CREATED - Dataset quad created
 * @property {string} QUAD_UPDATED - Dataset quad updated
 * @property {string} QUAD_DELETED - Dataset quad deleted
 * @property {string} DATASET_SYNCED - Dataset synced
 * @property {string} POST_CREATED - RDF post created
 * @property {string} POST_UPDATED - RDF post updated
 * @property {string} POST_DELETED - RDF post deleted
 * @property {string} MODEL_SYNCED - RDF model synced
 * @property {string} ENDPOINT_ADDED - Endpoint added
 * @property {string} ENDPOINT_REMOVED - Endpoint removed
 * @property {string} ENDPOINT_UPDATED - Endpoint updated
 * @property {string} ENDPOINT_STATUS_CHANGED - Endpoint status changed
 * @property {string} ENDPOINTS_STATUS_CHECKED - Endpoints status checked
 * @property {string} ENDPOINT_CHECK_REQUESTED - Endpoint check requested
 * @property {string} SPARQL_QUERY_STARTED - SPARQL query started
 * @property {string} SPARQL_QUERY_COMPLETED - SPARQL query completed
 * @property {string} SPARQL_QUERY_FAILED - SPARQL query failed
 * @property {string} SPARQL_UPDATE_STARTED - SPARQL update started
 * @property {string} SPARQL_UPDATE_COMPLETED - SPARQL update completed
 * @property {string} SPARQL_UPDATE_FAILED - SPARQL update failed
 * @property {string} VIEW_CHANGED - UI view changed
 * @property {string} NOTIFICATION_SHOW - UI notification show
 * @property {string} FORM_SUBMITTED - UI form submitted
 */
export const EVENTS = {
    // Error events
    ERROR_OCCURRED: 'error:occurred',
    // Application lifecycle
    APP_INITIALIZED: 'app:initialized',
    SHARE_RECEIVED: 'app:share:received',
    // State
    STATE_CHANGED: 'state:changed',
    // Dataset
    GRAPH_CREATED: 'dataset:graph:created',
    GRAPH_UPDATED: 'dataset:graph:updated',
    GRAPH_DELETED: 'dataset:graph:deleted',
    QUAD_CREATED: 'dataset:quad:created',
    QUAD_UPDATED: 'dataset:quad:updated',
    QUAD_DELETED: 'dataset:quad:deleted',
    DATASET_SYNCED: 'dataset:dataset:synced',
    // RDF model
    POST_CREATED: 'rdf:post:created',
    POST_UPDATED: 'rdf:post:updated',
    POST_DELETED: 'rdf:post:deleted',
    MODEL_SYNCED: 'rdf:model:synced',
    // Endpoint
    ENDPOINT_ADDED: 'endpoint:added',
    ENDPOINT_REMOVED: 'endpoint:removed',
    ENDPOINT_UPDATED: 'endpoint:updated',
    ENDPOINT_STATUS_CHANGED: 'endpoint:status:changed',
    ENDPOINTS_STATUS_CHECKED: 'endpoints:status:checked',
    ENDPOINT_CHECK_REQUESTED: 'endpoint:check:requested',
    // SPARQL
    SPARQL_QUERY_STARTED: 'sparql:query:started',
    SPARQL_QUERY_COMPLETED: 'sparql:query:completed',
    SPARQL_QUERY_FAILED: 'sparql:query:failed',
    SPARQL_UPDATE_STARTED: 'sparql:update:started',
    SPARQL_UPDATE_COMPLETED: 'sparql:update:completed',
    SPARQL_UPDATE_FAILED: 'sparql:update:failed',
    // UI
    VIEW_CHANGED: 'ui:view:changed',
    NOTIFICATION_SHOW: 'ui:notification:show',
    FORM_SUBMITTED: 'ui:form:submitted'
}