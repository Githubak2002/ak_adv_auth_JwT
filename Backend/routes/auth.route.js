import express from "express";

const router = express.Router();
import { forgetPassController, loginController, logoutController, resetPassController, signupController, checkAuthController, verifyEmailVerificationCodeController, verifyEmailController, deleteUserAccount } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";


router.get("/check-auth", verifyToken, checkAuthController);

router.post("/signup", signupController);

router.post("/login",loginController);
router.post("/logout", logoutController)


// ==== email verification ====
router.post("/verify-email", verifyEmailController);
router.post("/verify-email-verification-code", verifyEmailVerificationCodeController);

// ==== forget and reset password  ====
router.post("/forget-password", forgetPassController)
router.post("/reset-password/:token", resetPassController)

// ==== delete account  ====
router.delete("/delete-account", verifyToken, deleteUserAccount);




export default router;