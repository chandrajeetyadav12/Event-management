import {
    Request,
    Response,
} from "express";

import * as bookingService
    from "../services/booking.service";

export const createBooking =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const {
                eventId,
                seats,
            } = req.body;

            const booking =
                await bookingService.createBooking(
                    req.user!.userId,
                    eventId,
                    seats
                );

            res.status(201).json({
                success: true,
                data: booking,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };

export const getMyBookings =
    async (
        req: Request,
        res: Response
    ) => {
        const bookings =
            await bookingService.getMyBookings(
                req.user!.userId
            );

        res.status(200).json({
            success: true,
            data: bookings,
        });
    };

export const cancelBooking =
    async (
        req: Request,
        res: Response
    ) => {
        try {
            const bookingId = req.params.id as string;
            const booking =
                await bookingService.cancelBooking(
                    bookingId,
                    req.user!.userId
                );

            res.status(200).json({
                success: true,
                data: booking,
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message:
                    error.message,
            });
        }
    };