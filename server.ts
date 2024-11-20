import { createServer } from "node:http"
import next from "next"
import { Server } from "socket.io"
import { DatabaseChangeEmitter } from "@/lib/DatabaseChangeEmitter"

import { getJobs } from '@/app/api/jobs/handler'
import { getSubmittedJobs } from "@/app/api/jobs/submitted/handler"
import { getDeletedJobs } from "@/app/api/jobs/deleted/handler"

const dev = process.env.NODE_ENV !== "production";
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  io.on('connection', async (socket) => {
    console.log('Client connected (in server.ts)');

    socket.emit('get-all-jobs', await getJobs());
    socket.emit('get-submitted-jobs', await getSubmittedJobs());
    socket.emit('get-deleted-jobs', await getDeletedJobs());
    
    socket.on('disconnect', () => {
      console.log('Client disconnected (in server.ts)');
    });
  });

  // Database change emitter setup
  const dbEmitter = new DatabaseChangeEmitter({
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  async function setupDatabaseWatcher() {
    try {
      await dbEmitter.connect();
      await dbEmitter.watchTable("jobs");

      // Broadcast changes to all connected clients
      dbEmitter.on("change", (change) => {
        console.log("Broadcasting change: ", change);
        io.emit("job-update", change); // Emit the change event to all clients
      });

      // Handle database watcher errors
      dbEmitter.on("error", (error) => {
        console.error("Database watcher error:", error);
      });
    } catch (error) {
      console.error("Failed to set up database watcher:", error);
    }
  }

  setupDatabaseWatcher();

  httpServer
    .once("error", (err) => {
      console.error("Server error:", err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});