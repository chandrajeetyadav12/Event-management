// import http from "http";
// import app from "./app";
// import { connectDB } from "./config/db";
// import { env } from "./config/env";

// const startServer = async () => {
//   try {
//     await connectDB();

//     const server = http.createServer(app);

//     server.listen(env.PORT, () => {
//       console.log(
//         `Server running on port ${env.PORT}`
//       );
//     });
//   } catch (error) {
//     console.error("Server Error:", error);
//   }
// };

// startServer();
import http from "http";

import app from "./app";

import { connectDB } from "./config/db";

import { env } from "./config/env";

import {
  initializeSocket,
} from "./config/socket";

import {
  registerBookingEvents,
} from "./sockets/booking.socket";

const startServer = async () => {
  try {
    await connectDB();

    const server =
      http.createServer(app);

    const io =
      initializeSocket(server);

    registerBookingEvents(io);

    server.listen(
      env.PORT,
      () => {
        console.log(
          `Server running on ${env.PORT}`
        );
      }
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();