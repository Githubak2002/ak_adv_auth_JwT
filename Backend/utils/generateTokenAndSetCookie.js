import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {

  // const tkn = jwt.sing(paylod , secret, {options})
	const token = jwt.sign({userId}, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

  // res.cookie("Token_name",token_value, {options});
	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};



// res.cookie - Set a Cookie - It sends this token to the user's browser and stores it in a cookie named "token". This cookie is:

// - HttpOnly: It prevents js from accessing the cookie. This is a security feature to prevent XSS attacks from stealing the token.
// - Secure: It ensures the cookie is transmitted over a secure connection (HTTPS).
// - SameSite: It prevents the cookie from being sent in cross-site requests.
