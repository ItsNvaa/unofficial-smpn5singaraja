import express from "express";
const router = express.Router();
import register from "../controllers/auth.register.controller";
import login from "../controllers/auth.login.controller";
import logout from "../controllers/auth.logout.controller";

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
