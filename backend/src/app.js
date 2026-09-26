/**
 * Express application assembly.
 *
 * Responsibility: wire together middleware and routes into a single
 * `app` object. Deliberately does NOT call app.listen() — that belongs
 * in server.js, so this file can also be imported directly by tests
 * later without starting a real server.
 */
const express = require('express');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');
const routes = require('./routes');

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use('/api', routes);

// Must be registered after all routes.
app.use(errorHandler);

module.exports = app;
