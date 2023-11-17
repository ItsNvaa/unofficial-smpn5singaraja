import express from "express";
const router = express.Router();
import register from "../controllers/auth.register.controller";

router.post("/register", register);

export default router;
