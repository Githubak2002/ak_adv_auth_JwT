<ul>FEATURES</ul>
  <li>JWT</li> 
  <li>User Authentication</li> 
  <li>User Authorization</li> 
  <li>MERN Stack</li> 
  <li>Tailwind CSS</li> 
  <li>Zustand</li> 
  <li>Emails</li>
  <li>Error Handling</li> 
  <li>Forget Password & Password Reset</li>

<<<<<<< HEAD
=======
<ul>FEATURES</ul>
  <li>JWT</li> 
  <li>User Authentication</li> 
  <li>User Authorization</li> 
  <li>MERN Stack</li> 
  <li>Tailwind CSS</li> 
  <li>Zustand</li> 
  <li>Emails</li>
  <li>Error Handling</li> 
  <li>Forget Password & Password Reset</li>

>>>>>>> 0280373a4eec880711475f518ee9b87cf6020412

<h5>To-Do</h5>
  - jest? react testing library
  - delete account confirmation/popup btn

============== NPM Package Details ============== 

  cookie-parser: Middleware to parse cookies
  jsonwebtoken: For generating $ verifying JSON Web Tokens (JWTs)
  app.use(express.json()):  parse incoming req with JSON payloads
  dotenv: For managing .env 
  express: A web framework for Node.js
  bcryptjs: For hashing passwords.
  mongoose: An Object Data Modeling (ODM) library for MongoDB.


  nodemon: to restart the server for any change happen.


  mailtrap: For email testing (you might need this only if you are using Mailtrap for email sending/testing).



  app.use(express.json()):  we need to get json data from the frontedn in term of req.body 

  crypto is an inbuild package - its functions
    - randomInt(10,20)
    - randomByts(20).toString('hex)

  
============== JWT Methods ============== 

1. jwt.sign(payload, secretOrPrivateKey, options)
  Purpose: Create a new JWT.
  Parameters:
  payload: The data you want to include in the token (e.g., user ID, roles)
  secretOrPrivateKey: A secret key used to sign the token. This keeps the token secure.
  options: Optional settings like expiration time.
  Usage: Generate a token that can be sent to clients or stored for later use.

  Example:
    const token = jwt.sign({ userId: '1234' }, 'your-secret-key', { expiresIn: '1h' });

2. jwt.verify(token, secretOrPublicKey, options, callback)
  Purpose: Check if a JWT is valid and decode it.
  Parameters:
  token: The JWT you want to verify.
  secretOrPublicKey: The key used to sign the token (to verify its authenticity).
  options: Optional settings like expected audience or issuer.
  callback: A function that gets called with the result of the verification (or an error).
  Usage: Verify the token’s validity and extract the payload if it’s valid.

  Example:
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      console.error('Invalid token');
    } else {
      console.log('Decoded payload:', decoded);
    }
    });

3. jwt.decode(token, options)
  Purpose: Decode a JWT without verifying its signature.
  Parameters:
  token: The JWT you want to decode.
  options: Optional settings (e.g., whether to get the header or just the payload).
  Usage: Extract and view the payload of a token without validating it. Useful for quick checks or debugging.

  Example:
  const decoded = jwt.decode(token);
  console.log('Decoded payload:', decoded);


============== Zustand store ============== 

Use "setState" when you want to update the state:
  Example - useAuthStore.setState({ forgotPassPopup: true });
  
Use the "selector function" when you want to read state values:
  Example - const isVisible = useAuthStore((state) => state.forgotPassPopup);
