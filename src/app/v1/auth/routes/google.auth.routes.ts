import express from "express";
const router = express.Router();
import {
  redirectGoogleAuth,
  loginWithGoogle,
} from "../controllers/google.login.controller";

router.get("/", redirectGoogleAuth);
router.get("/callback", loginWithGoogle);

export default router;
