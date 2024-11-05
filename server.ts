import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"

import getJobs from './src/app/api/jobs/handler'

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.emit('jobsUpdated', getJobs());
    
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // TODO: Data Change Detection
  //       add here a listener that responds to database changes (e.g., using database triggers or polling).

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});