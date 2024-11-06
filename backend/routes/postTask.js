"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks"); // Import the tasks array and Task type
// Initialize a counter to assign unique IDs to new tasks
var currentId = 1;
/**
 * Handles the POST request to add a new task.
 *
 * This function parses the incoming JSON body to create a new task.
 * If the title is missing or the JSON is invalid, it returns a 400 error.
 * Otherwise, it adds the new task to the tasks list and returns the created task with a 201 status.
 *
 * @param req - IncomingMessage object, representing the HTTP request
 * @param res - ServerResponse object, used to send the response back to the client
 */
function postTask(req, res) {
    var body = '';
    // Collect data chunks from the request body
    req.on('data', function (chunk) { return (body += chunk); });
    // After receiving all data, proceed to handle the request
    req.on('end', function () {
        try {
            // Parse the received JSON to extract the title field
            var title = JSON.parse(body).title;
            // Check if the title is present, if not return a 400 error
            if (!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Title is required' }));
            }
            // Create a new task with a unique ID and the provided title
            var newTask = { id: "".concat(currentId++), title: title };
            // Add the new task to the tasks array
            tasks_1.default.push(newTask);
            // Respond with a 201 status (Created) and the new task in JSON format
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        }
        catch (_a) {
            // If parsing fails, return a 400 error for invalid JSON
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}
// Export the postTask function for use in routing
exports.default = postTask;
