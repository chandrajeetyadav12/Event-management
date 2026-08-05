import { Server } from "socket.io";

export const registerBookingEvents = (
  io: Server
) => {
  io.on("connection", (socket) => {
    console.log(
      `Booking Socket Connected: ${socket.id}`
    );

    socket.on(
      "join-event",
      (eventId: string) => {
        socket.join(eventId);

        console.log(
          `${socket.id} joined ${eventId}`
        );
      }
    );

    socket.on("leave-event", (eventId) => {
      socket.leave(eventId);
    });
  });
};