# evb

[![Build](https://github.com/danja/evb/actions/workflows/ci.yml/badge.svg)](https://github.com/danja/evb/actions)
[![Coverage Status](https://coveralls.io/repos/github/danja/evb/badge.svg?branch=main)](https://coveralls.io/github/danja/evb?branch=main)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A minimal, dependency-free JavaScript event bus for decoupled communication between modules.

## Overview

`evb` (Event Bus) provides a simple publish/subscribe mechanism for JavaScript applications. It is designed to be lightweight and easy to integrate, making it suitable for small projects, prototypes, or educational purposes. The API is intentionally minimal, focusing on core event bus functionality without extra features or complexity.

## Features

- Publish/subscribe pattern for decoupled communication
- No external dependencies
- Works in both browser and Node.js environments
- Simple, readable codebase

## Installation

You can install `evb` locally (for development or as a dependency):

```sh
npm install ../evb
```

Or, if published to npm:

```sh
npm install evb
```

## Usage

```js
import { on, off, emit } from 'evb';

// Subscribe to an event
on('my-event', (data) => {
  console.log('Received:', data);
});

// Emit an event
emit('my-event', { foo: 'bar' });

// Unsubscribe
off('my-event', handler);
```

## API

- `on(eventName, handler)`: Register a handler for an event.
- `off(eventName, handler)`: Remove a handler for an event.
- `emit(eventName, data)`: Emit an event with optional data.

## Limitations

- No wildcard or namespaced events.
- No event replay or history.
- No built-in error handling for handlers.
- Not intended for large-scale or production-critical systems.

## Project Structure

```
evb/
├── src/
│   ├── event-bus.js
│   ├── event-constants.js
│   ├── state-utils.js
│   ├── store.js
│   └── index.js
├── test/
│   └── unit/
├── README.md
├── package.json
└── ...
```

## Testing

Unit tests are provided using [Vitest](https://vitest.dev/). To run the tests:

```sh
npm test
```

## License

MIT License. See the LICENSE file for details.
