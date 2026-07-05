import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routes.js";
import videoRouter from "./src/routes/video.routes.js";
import commentRouter from "./src/routes/comment.routes.js";
import likeRouter from "./src/routes/like.routes.js";
import playlistRouter from "./src/routes/playlist.routes.js";
import subscriptionRouter from "./src/routes/subscription.routes.js";
import tweetRouter from "./src/routes/tweet.routes.js";
import dashboardRouter from "./src/routes/dashboard.routes.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/comments", commentRouter);
app.use("/api/likes", likeRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/subscriptions", subscriptionRouter);
app.use("/api/tweets", tweetRouter);
app.use("/api/dashboard", dashboardRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "WanderLens API is running" });
});

app.use(errorMiddleware);

export { app };
