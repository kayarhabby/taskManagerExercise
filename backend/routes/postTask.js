"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tasks_1 = require("../data/tasks");
var currentId = 1;
function postTask(req, res) {
    var body = '';
    req.on('data', function (chunk) { return (body += chunk); });
    req.on('end', function () {
        try {
            var title = JSON.parse(body).title;
            if (!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Title is required' }));
            }
            var newTask = { id: "".concat(currentId++), title: title };
            tasks_1.default.push(newTask);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        }
        catch (_a) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}
exports.default = postTask;
