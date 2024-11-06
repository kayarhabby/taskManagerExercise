import { ServerResponse, IncomingMessage } from "http";
import tasks, {Task} from "../data/tasks";

let currentId = 1;
function postTask(req: IncomingMessage, res: ServerResponse): void {
    let body = '';
    req.on('data', chunk => (body += chunk));
    req.on('end', () => {
        try {
            const { title } = JSON.parse(body);
            if (!title) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ error: 'Title is required' }));
            }
            const newTask: Task = { id: `${currentId++}`, title };
            tasks.push(newTask);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}

export default postTask;
