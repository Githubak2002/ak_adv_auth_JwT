import express from "express";

const router = express.Router();
import { forgetPassController, loginController, logoutController, resetPassController, signupController, verifyUserController, checkAuthController } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


router.get("/check-auth", verifyToken, checkAuthController);

router.post("/signup", signupController);
router.post("/verify-user", verifyUserController);

router.post("/login",loginController);
router.post("/logout", logoutController)

router.post("/forget-password", forgetPassController)
router.post("/reset-password/:token", resetPassController)




export default router;