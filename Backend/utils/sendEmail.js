import nodemailer from "nodemailer";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplet.js";

const transporter = nodemailer.createTransport({
  secure: true, // true for port 465, false for other ports
  host: "smtp.gmail.com",
  port: 465,
  // host: "smtp.e..thereal.email",
  // port: 587,
  auth: {
    user: "appylohar@gmail.com",
    pass: "owokzhnlqzzazxgg",
  },
});

// ======== send Verification email ========
export const sendVerificationEmail = async (email, verificationToken) => {
  // email = "appylohar@gmail.com";
  // verificationToken = "123455";
  const info = await transporter.sendMail({
    from: '"Ak Advance JwT auth" <maddison53@ethereal.email>', // sender address
    to: email,
    subject: "Verification Email", // Subject line
    // text: "Hello world?", // plain text body
    html: VERIFICATION_EMAIL_TEMPLATE.replace( "{verificationCode}", verificationToken ),
  });

  // console.log("Message sent: %s", info);
};

// ======== send Pasword Reset email ========
export const sendPasswordResetEmail = async (email,resetURL) => {
  const info = await transporter.sendMail({
    from: '"Ak Advance JwT auth" <maddison53@ethereal.email>', // sender address
    to: email,
    subject: "Reset your Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
  });
}

// sendVerificationEmail("appylohar@gmail.com", 123456);
