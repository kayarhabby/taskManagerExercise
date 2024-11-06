import { IncomingMessage, ServerResponse } from 'http';
import getTasks from './routes/getTasks';
import postTask from './routes/postTask';

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
function router(req: IncomingMessage, res: ServerResponse): void {
  // Destructure the HTTP method and URL from the request
  const { method, url } = req;

  // Route handling for GET /tasks to fetch all tasks
  if (method === 'GET' && url === '/tasks') {
    return getTasks(req, res);
  }

  // Route handling for POST /tasks to add a new task
  if (method === 'POST' && url === '/tasks') {
    return postTask(req, res);
  }

  // If no route matches, return a 404 Not Found error response
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found' }));
}


export default router;
