import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./database/index.js";
import userRouter from "./routes/user.js";

connectDB();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", userRouter);

app.use("/api", (req, res) => {
  res.status(200).json({
    message: "Hello Express",
  });
});

app.listen(5000, () => console.log(`App is now running at port 5000`));
