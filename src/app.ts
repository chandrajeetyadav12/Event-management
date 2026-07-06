import express, {
  Application,
  Request,
  Response,
} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";
import bookingRoutes
from "./routes/booking.routes";
const app: Application = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(helmet());



app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(limiter);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings",bookingRoutes);
app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Ticket Booking API Running",
  });
});

export default app;