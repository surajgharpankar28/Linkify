import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  ssl: true, // Ensure SSL is enabled for MongoDB Atlas
};

let client;
let clientPromise;

try {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = MongoClient.connect(uri, options);
    }
    clientPromise = global._mongoClientPromise;
  } else {
    clientPromise = MongoClient.connect(uri, options);
  }

  console.log("MongoDB connection initialized.");
} catch (err) {
  console.error("Error initializing MongoDB connection:", err);
}

export default clientPromise;
