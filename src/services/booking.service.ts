import Booking from "../models/Booking";
import Event from "../models/Event";
import { getIO } from "../config/socket";
export const createBooking =
  async (
    userId: string,
    eventId: string,
    seats: number
  ) => {
    const event =
      await Event.findById(eventId);

    if (!event) {
      throw new Error(
        "Event not found"
      );
    }

    if (
      event.availableSeats < seats
    ) {
      throw new Error(
        "Not enough seats available"
      );
    }

    event.availableSeats =
      event.availableSeats - seats;

    await event.save();

    const io = getIO();

    io.to(event._id.toString()).emit("seat-updated", {
      eventId: event._id,
      availableSeats: event.availableSeats,
    });
   console.log("Seat update emitted");
    const booking =
      await Booking.create({
        userId,
        eventId,
        seats,
      });
    io.to(event._id.toString()).emit("new-booking", {
      bookingId: booking._id,
      userId,
      eventId,
      seats,
    });
    console.log("New booking emitted");
    return booking;
  };

export const getMyBookings =
  async (userId: string) => {
    return Booking.find({
      userId,
    })
      .populate("eventId")
      .sort({
        createdAt: -1,
      });
  };

export const cancelBooking =
  async (
    bookingId: string,
    userId: string
  ) => {
    const booking =
      await Booking.findOne({
        _id: bookingId,
        userId,
      });

    if (!booking) {
      throw new Error(
        "Booking not found"
      );
    }

    const event =
      await Event.findById(
        booking.eventId
      );

    if (event) {
      event.availableSeats +=
        booking.seats;

      await event.save();
    }

    booking.bookingStatus =
      "cancelled";

    await booking.save();

    const io = getIO();

    if (event?._id) {
      io.to(event._id.toString()).emit("seat-updated", {
        eventId: event._id,
        availableSeats: event.availableSeats,
      });
    }

    return booking;
  };