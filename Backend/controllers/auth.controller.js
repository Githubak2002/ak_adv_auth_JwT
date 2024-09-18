import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { randomBytes, randomInt } from "crypto";
import bcryptjs from "bcryptjs";
import { sendPasswordResetEmail, sendVerificationEmail } from "../utils/sendEmail.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173"

// ===== Check User  =====
export const checkAuthController = async (req,res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		// in the verify token middleware manually set req.userId
		const userID = await req.userId;
		// console.log("userId: ",userID);
		if (!user) {
			return res.status(400).json({ success: false, msg: "User not found" });
		}
		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth → ", error);
		res.status(400).json({ success: false, msg: error.message });
	}
}

// ===== Signup Controller =====
export const signupController = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name)
      throw new Error("All fields are required");

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists)
      return res
        .status(400)
        .json({ success: false, msg: "User already exists" });

    const hashedPassword = await bcryptjs.hash(password, 10);
    // const verificationToken = randomInt(10000, 100000);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      // verificationToken,
      // verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);
    // const emailRes = await sendVerificationEmail(user.email, verificationToken);
    // console.log("Email sent → ",)

    res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, msg: error.message });
  }
};

// ===== Login Controller =====
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials" });
    const isPassCorrect = await bcryptjs.compare(password, user.password);
    if (!isPassCorrect)
      return res
        .status(400)
        .json({ success: false, msg: "Invalid Credentials" });

    generateTokenAndSetCookie(res, user._id);

    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      msg: "Logged in successfully!",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("Error in loginController → ", error);
    res.status(400).json({ msg: error.message, success: false });
  }
};

// ===== LogOut Controller =====
export const logoutController = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};


// ===== Verify Email Controller - sends email with code =====  
export const verifyEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email Not Found" });
    }

    const verificationCode = randomInt(100000, 1000000);
    user.verificationToken = verificationCode;
    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    sendVerificationEmail(email, verificationCode);
    
    res.status(200).json({ success: true, msg: "Verification email sent successfully" });
  } catch (error) {
    console.log("error in verifyEmailController → ", error);
    res.status(500).json({ success: false, msg: `Server error: ${error.message}` });
  }
}

// ===== Verify User Controller - verifies the code =====
export const  verifyEmailVerificationCodeController = async (req, res) =>{
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // Optionally send a welcome email or other follow-up actions
    // await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      msg: "Email verified!",
      user: {
        ...user._doc,
        password: undefined, 
      },
    });
  } catch (error) {
    console.log("error in verifyUserController → ", error);
    res.status(500).json({ success: false, msg: "Server error: " + error.message });
  }
}



// ===== Forget password Controller =====
export const forgetPassController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, msg: "Email not found" });

    // Generate reset token
    const resetToken = randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;
    await user.save();

    // send email
    await sendPasswordResetEmail( user.email,`${CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({
        success: true,
        message: "Password reset email sent!",
      });
  } catch (error) {
		console.log("Error in Forget Password Controller → ", error);
		res.status(400).json({ msg: error.message, success: false });
	}
};

// ===== Reset password Controller =====
export const resetPassController = async(req,res) => {
	try {
		const {token} = req.params;
		const {password} = req.body;
		const user = await User.findOne({
			resetPasswordToken: token, 
			resetPasswordExpiresAt: { $gt: Date.now() }
		});
		if (!user) return res.status(400).json({ success: false, msg: "Invalid or expired Reset token"});
		
		const hashedPassword = await bcryptjs.hash(password,10);
		user.password = hashedPassword;
		user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
		await user.save();

		res.status(200).json({success:true,msg:"Password reset successfully"});
	} catch (error) {
		console.log("Error in Reset Password Controller → ", error);
		res.status(400).json({ msg: error.message, success: false });		
	}
}

// ===== delete user account =====
export const deleteUserAccount = async (req, res) => {
  const id = req.userId;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ success: false, msg: "User Not Found!" });
    res.clearCookie("token");
    res.status(200).json({ success: true, msg: "Account Deleted" });    
  } catch (error) {
    console.log("Error in Delete User Account → ", error);
    res.status(400).json({ msg: "Server Error", success: false });
  }
}




