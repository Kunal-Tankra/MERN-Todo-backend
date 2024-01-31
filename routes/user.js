import express from "express";
import { register, getMyProfile, login, logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

export const router = express.Router()

// router.get("/all", getAllUsers)

router.post("/new", register)

router.post("/login", login)

router.get("/logout", logout)

router.get("/me", isAuthenticated, getMyProfile)