import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URL);
		// console.log(`MongoDB Connected: ${conn.connection.host}`);
    return true;
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
    return false;
		// process.exit(1); // 1 is failure, 0 status code is success
	}
};


/* conn.connection.readyState

  Description: The current state of the connection. It can be:
    0 - Disconnected
    1 - Connected
    2 - Connecting
    3 - Disconnecting
*/


/*

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

*/