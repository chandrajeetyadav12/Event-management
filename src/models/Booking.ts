import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IBooking
  extends Document {
  userId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  seats: number;
  bookingStatus:
    | "pending"
    | "confirmed"
    | "cancelled";
}

const bookingSchema =
  new Schema<IBooking>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      eventId: {
        type: Schema.Types.ObjectId,
        ref: "Event",
        required: true,
      },

      seats: {
        type: Number,
        required: true,
      },

      bookingStatus: {
        type: String,
        enum: [
          "pending",
          "confirmed",
          "cancelled",
        ],
        default: "confirmed",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model<IBooking>(
  "Booking",
  bookingSchema
);