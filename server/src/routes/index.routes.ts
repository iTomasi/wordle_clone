import { Router } from "express";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";

// passport
import passport_jwt from "../passport_custom/passport_jwt";

const router = Router();

//* Auth routes
router.get("/auth", passport_jwt, authCtrls.GET_userAuthenticated);
router.post("/auth/sign-up/email", authCtrls.POST_signUpEmail);

export default router;