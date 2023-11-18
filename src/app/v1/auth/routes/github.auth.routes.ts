import express from "express";
import {
  loginWithGithub,
  redirectGithubAuth,
} from "../controllers/github.login.controller";
const router = express.Router();

router.get("/callback", loginWithGithub);
router.get("/", redirectGithubAuth);

export default router;
