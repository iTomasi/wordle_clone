import { Router } from "express";

// Controllers
import * as authCtrls from "../controllers/auth.controllers";
import * as userCtrls from "../controllers/user.controllers";
import * as gameCtrls from "../controllers/game.controllers";

// passport
import passport_jwt from "../passport_custom/passport_jwt";

const router = Router();

//* Auth routes
router.get("/auth", passport_jwt, authCtrls.GET_userAuthenticated);
router.post("/auth/sign-up/email", authCtrls.POST_signUpEmail);
router.post("/auth/sign-in/email", authCtrls.POST_signInEmail);

//* User routes
router.get("/user/:username", userCtrls.GET_user);

//* Game routes
router.get("/games", gameCtrls.GET_games);
router.post("/game/create", passport_jwt, gameCtrls.POST_createGame);

export default router;