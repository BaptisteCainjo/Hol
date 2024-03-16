import { Router } from "express";
import {
    getArtisanReservations,
    createReservation,
    updateReservationState,
    getClientReservations,
} from "../controllers/reservationController.js";

const router = Router();

router.get("/artisan/:artisanId", getArtisanReservations);
router.get("/client/:clientId", getClientReservations);
router.post("/", createReservation);
router.patch("/", updateReservationState);

export default router;