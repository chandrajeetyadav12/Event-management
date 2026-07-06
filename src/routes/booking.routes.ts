import { Router } from "express";

import {
  createBooking,
  getMyBookings,
  cancelBooking,
} from "../controllers/booking.controller";

import { protect }
  from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/",
  protect,
  createBooking
);

router.get(
  "/my-bookings",
  protect,
  getMyBookings
);

router.put(
  "/cancel/:id",
  protect,
  cancelBooking
);

export default router;