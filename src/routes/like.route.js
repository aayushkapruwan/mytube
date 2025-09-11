import { Router } from "express";
const router = Router();
import { toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
router.post("/toggleVideoLike/:videoId", verifyJWT, toggleVideoLike);
router.post("/toggleCommentLike/:commentId", verifyJWT, toggleCommentLike);
router.post("/toggleTweetLike/:tweetId", verifyJWT, toggleTweetLike);
export default router;