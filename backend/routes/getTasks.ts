import { ServerResponse, IncomingMessage } from "http";
import tasks from "../data/tasks"; // Import the tasks array and Task type

/**
 * Handles the GET request for fetching all tasks.
 *
 * This function sends a response with all tasks in JSON format.
 * It sets the response status code to 200 (OK) and the content type to JSON.
 *
 * @param req - IncomingMessage object, representing the HTTP request
 * @param res - ServerResponse object, used to send the response back to the client
 */
function getTasks(req: IncomingMessage, res: ServerResponse): void {
    // Set the response header to indicate successful JSON response
    res.writeHead(200, { 'Content-Type': 'application/json' });

    // End the response by sending the tasks array serialized in JSON format
    res.end(JSON.stringify(tasks));
}

export default getTasks;
