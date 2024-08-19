import express from "express";
import connectDB from "./database/index.js";

const app = express();

connectDB();

app.use("/api", (req, res) => {
  res.status(200).json({
    message: "Hello Express",
  });
});

app.listen(5000, () => console.log(`App is now running at port 5000`));
