import mongoose from 'mongoose';

// Global variable to keep track of connection status
let isConnected = false;

export const connectDB = async () => {
  try {
    if (isConnected) {
      console.log("Previously connected to DB");
      return; // Exit early if already connected
    }

    const conn = await mongoose.connect(process.env.MONGODB_URL);

    // Update the global connection status
    isConnected = true;

    console.log(`Newly connected to DB`);
    // console.log(`Database Name → ${conn.connection.name}`);
    // console.log(`Connection Ready State → ${conn.connection.readyState}`);

  } catch (err) {
    console.error("Error connecting to MongoDB → ", err);
    process.exit(1);  // Exit with failure status
  }
};




/* conn.connection.readyState

  Description: The current state of the connection. It can be:
    0 - Disconnected
    1 - Connected
    2 - Connecting
    3 - Disconnecting
*/