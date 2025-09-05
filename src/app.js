import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, //from where request coming
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
import userRouter from "./routes/user.router.js";
import subscriptionRouter from "./routes/subscriber.router.js";
import videoRouter from "./routes/video.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscriber", subscriptionRouter);
app.use("/api/v1/video", videoRouter);
export { app };
