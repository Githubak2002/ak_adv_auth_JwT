# Project README

## Features

- **Authentication & Authorization**
  - JWT (JSON Web Tokens)
  - User Authentication
  - User Authorization

- **Technology Stack**
  - MERN Stack (MongoDB, Express, React, Node.js)
  - Tailwind CSS
  - Zustand (State Management)

- **Functionality**
  - Email Verification
  - Error Handling
  - Forgot Password & Password Reset
  - Signup, Login, and Logout Endpoints
  - Check Auth Endpoint
  - Sending Verification Emails

- **Frontend Setup**
  - Signup and Login Page UI
  - Implementing Signup
  - Implementing Email Verification
  - Protecting Routes
  - Implementing Login
  - Implementing Forgot Password

## To-Do
- Integrate Jest or React Testing Library for testing
- Add delete account confirmation/popup button

---

## NPM Package Details

- **cookie-parser**: Middleware to parse cookies
- **jsonwebtoken**: For generating and verifying JSON Web Tokens (JWTs)
- **dotenv**: For managing environment variables
- **express**: A web framework for Node.js
- **bcryptjs**: For hashing passwords
- **mongoose**: An Object Data Modeling (ODM) library for MongoDB
- **nodemon**: Automatically restarts the server when file changes are detected
- **mailtrap**: For testing email sending (if using Mailtrap)
- **crypto**: Built-in package for cryptographic functions
  - `randomInt(10, 20)`
  - `randomBytes(20).toString('hex')`

---

## JWT Methods

1. **`jwt.sign(payload, secretOrPrivateKey, options)`**
   - **Purpose**: Create a new JWT.
   - **Parameters**:
     - `payload`: Data to include in the token (e.g., user ID, roles).
     - `secretOrPrivateKey`: Secret key to sign the token.
     - `options`: Optional settings (e.g., expiration time).
   - **Usage**: Generate a token to send to clients or store for later use.
   - **Example**:
     ```javascript
     const token = jwt.sign({ userId: '1234' }, 'your-secret-key', { expiresIn: '1h' });
     ```

2. **`jwt.verify(token, secretOrPublicKey, options, callback)`**
   - **Purpose**: Check if a JWT is valid and decode it.
   - **Parameters**:
     - `token`: The JWT to verify.
     - `secretOrPublicKey`: Key used to sign the token for verification.
     - `options`: Optional settings (e.g., expected audience).
     - `callback`: Function called with verification result or error.
   - **Usage**: Verify token validity and extract payload if valid.
   - **Example**:
     ```javascript
     jwt.verify(token, 'your-secret-key', (err, decoded) => {
       if (err) {
         console.error('Invalid token');
       } else {
         console.log('Decoded payload:', decoded);
       }
     });
     ```

3. **`jwt.decode(token, options)`**
   - **Purpose**: Decode a JWT without verifying its signature.
   - **Parameters**:
     - `token`: The JWT to decode.
     - `options`: Optional settings (e.g., whether to get header or payload).
   - **Usage**: Extract and view token payload without validation. Useful for debugging.
   - **Example**:
     ```javascript
     const decoded = jwt.decode(token);
     console.log('Decoded payload:', decoded);
     ```

---

## Zustand Store Usage

- **Updating State**:
  ```javascript
  useAuthStore.setState({ forgotPassPopup: true });
