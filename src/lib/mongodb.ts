import mongoose from "mongoose"

let databaseURL = process.env.MONGODB_URL

if (!databaseURL) {
  throw new Error("database url is not found , please check environment variable")
}

let databaseConnections = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }
  try {
    await mongoose.connect(databaseURL!, { bufferCommands: false });
    return mongoose
  } catch (e: any) {
    console.log(e.message)
  }
}

export default databaseConnections;

