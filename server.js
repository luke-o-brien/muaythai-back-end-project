const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");


const fighterRouter = require("./controllers/fighters.js");
const testJwtRouter = require("./controllers/test-jwt.js");
const authRouter = require("./controllers/auth.js");


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`✅ Connected to MongoDB: ${mongoose.connection.name}`);
});


app.use((req, res, next) => {
  console.log("🔍 Origin:", req.headers.origin);
  console.log("🔍 Method:", req.method);
  next();
});

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

app.options("*", cors());


app.use(express.json());
app.use(logger("dev"));

app.use("/fighters", fighterRouter);
app.use("/auth", authRouter);
app.use("/test-jwt", testJwtRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 The Express app is running on port ${PORT}`);
});
