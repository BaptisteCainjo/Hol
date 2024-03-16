import Reservation from "../models/reservation.js";
import User from "../models/user.js";
import Product from "../models/product.js";
import Shop from "../models/shop.js";

// @desc Get all artisan reservations
// @route GET /api/reservations/artisan/:artisanId
const getArtisanReservations = async (req, res) => {
  try {
    const { artisanId } = req.params;

    const shop = await Shop.findOne({ owner: artisanId });

    const reservations = await Reservation.find({
      "product.shop": shop._id,
    });

    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations de l'artisan.",
    });
  }
};

// @desc Get all client reservations
// @route GET /api/reservations/client/:clientId
const getClientReservations = async (req, res) => {
  try {
    const { clientId } = req.params;
    const reservations = await Reservation.find({
      "user._id": clientId,
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erreur lors de la récupération des réservations du client.",
    });
  }
}

// @desc Create a reservation
// @route POST /api/reservations
const createReservation = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res.status(404).json({
        message: "Utilisateur ou produit introuvable.",
      });
    }

    const reservation = new Reservation({
      user,
      product,
    });
    await reservation.save();
    res.status(201).json({ reservation });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de la réservation.",
    });
  }
};

// @desc Update reservation state
// @route PATCH /api/reservations
const updateReservationState = async (req, res) => {
  try {
    const { reservationId, state } = req.body;
    const allowedStates = Reservation.schema.path("state").enumValues;
    if (!allowedStates.includes(state)) {
      return res.status(400).json({ message: "Statut invalide." });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { state },
      { new: true }
    );
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la mise à jour du statut de la réservation.",
    });
  }
};

export { getArtisanReservations, getClientReservations, createReservation, updateReservationState };
