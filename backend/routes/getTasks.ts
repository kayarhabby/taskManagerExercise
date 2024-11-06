import { ServerResponse, IncomingMessage } from "http";
import tasks from "../data/tasks";

function getTasks(req: IncomingMessage, res: ServerResponse): void {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
}

export default getTasks;
