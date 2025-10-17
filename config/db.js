import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    return conn; 
  } catch (error) {
    console.error(' MongoDB connection failed:', error.message);
    return null; 
  }
};

export default connectDb;

