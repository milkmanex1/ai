import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

//need to add js at the end of files. We are coding in Node.js now, not Javascript anymore
import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);
//We created API endpoints that we can connect to on your Front end side

app.get("/", async (req, res) => {
  res.send("Hello from AI");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(process.env.PORT, () =>
      console.log("Connected to db and  listening on port", process.env.PORT)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
