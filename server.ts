import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"

import { getJobs } from '@/app/api/jobs/handler'
import getSubmittedJobs from "@/app/api/jobs/submitted/handler"

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log('Client connected');

    socket.emit('get-all-jobs', await getJobs());
    socket.emit('get-submitted-jobs', await getSubmittedJobs());
    // socket.emit('job-updated', getJobs());
    
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