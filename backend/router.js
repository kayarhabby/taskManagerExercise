"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getTasks_1 = require("./routes/getTasks");
var postTask_1 = require("./routes/postTask");
/**
 * Routes incoming HTTP requests to the appropriate handler based on the request method and URL.
 *
 * This function supports:
 * - GET /tasks: Fetches all tasks
 * - POST /tasks: Adds a new task
 *
 * If a route is not matched, it responds with a 404 status and a 'Not found' error message.
 *
 * @param req - IncomingMessage object representing the HTTP request
 * @param res - ServerResponse object used to send the response back to the client
 */
function router(req, res) {
    // Destructure the HTTP method and URL from the request
    var method = req.method, url = req.url;
    // Route handling for GET /tasks to fetch all tasks
    if (method === 'GET' && url === '/tasks') {
        return (0, getTasks_1.default)(req, res);
    }
    // Route handling for POST /tasks to add a new task
    if (method === 'POST' && url === '/tasks') {
        return (0, postTask_1.default)(req, res);
    }
    // If no route matches, return a 404 Not Found error response
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
}
exports.default = router;
