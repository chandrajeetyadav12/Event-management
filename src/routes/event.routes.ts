import { Router } from "express";

import * as eventController from "../controllers/event.controller";

import { protect } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";
const router = Router();

router.get("/", eventController.getEvents);

router.get("/:id", eventController.getEvent);

router.post(
  "/",
  protect,
  authorize("admin"),
  eventController.createEvent
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  eventController.updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  eventController.deleteEvent
);

export default router;