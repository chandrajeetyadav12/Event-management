import { Request, Response } from "express";

import * as eventService from "../services/event.service";

export const createEvent = async (
  req: Request,
  res: Response
) => {
  const event =
    await eventService.createEvent(
      req.body
    );

  res.status(201).json({
    success: true,
    data: event,
  });
};

export const getEvents = async (
  req: Request,
  res: Response
) => {
  const { search } = req.query;
  
  const events =
    await eventService.getEvents(
      search as string | undefined
    );

  res.status(200).json({
    success: true,
    data: events,
  });
};

export const getEvent = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const event =
    await eventService.getEventById(
      req.params.id
    );

  res.status(200).json({
    success: true,
    data: event,
  });
};

export const updateEvent = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const event =
    await eventService.updateEvent(
      req.params.id,
      req.body
    );

  res.status(200).json({
    success: true,
    data: event,
  });
};

export const deleteEvent = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  await eventService.deleteEvent(
    req.params.id
  );

  res.status(200).json({
    success: true,
    message: "Event deleted",
  });
};