import mongoose, {
  Document,
  Schema,
} from "mongoose";

export interface IEvent extends Document {
  title: string;
  description: string;
  venue: string;
  date: Date;
  price: number;
  totalSeats: number;
  availableSeats: number;
}

const eventSchema = new Schema<IEvent>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    venue: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    totalSeats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEvent>(
  "Event",
  eventSchema
);