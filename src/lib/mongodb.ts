import mongoose from "mongoose"

const databaseURI = process.env.MONGODB_URI

if (!databaseURI) {
  throw new Error("database url is not found , please check environment variable")
}

const databaseConnections = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose
  }
  try {
    await mongoose.connect(databaseURI!, { bufferCommands: false });
    return mongoose
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message)

    } else {
      console.log('something is wrong')
    }
  }
}

export default databaseConnections;

