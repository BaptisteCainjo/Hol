import express from "express";
import {
  getUsers,
  registerUser,
  getUser,
  registerArtisan,
  loginUser,
  getLoginUser,
  logoutUser
} from "../controllers/authController.js";
import { getUserShop } from "../controllers/userController.js";
const router = express.Router();

router.get("/users", getUsers);
router.post("/users", registerUser);
router.get("/users/login", getLoginUser);
router.get("/users/:userEmail", getUser);
//router.put("/users/:userEmail", registerArtisan);
router.post("/users/login", loginUser);
router.post("/users/logout", logoutUser);
router.get("/users/:userId/shop", getUserShop);

export default router;
