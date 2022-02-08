import { Router } from "express";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";

const router = Router();

//* Auth routes
router.post("/auth/sign-up/email", authCtrls.POST_signUpEmail);

export default router;