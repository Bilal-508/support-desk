import { app } from "./app.js";
import connectDB from "./db/db.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server listening to the port: ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MongoDb connection failed: ", error);
  });
