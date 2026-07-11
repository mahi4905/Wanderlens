import { Router } from "express";
import { toggleVideoLike, toggleCommentLike, toggleTweetLike, getLikedVideos } from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.post("/toggle/video/:id", toggleVideoLike);
router.post("/toggle/comment/:id", toggleCommentLike);
router.post("/toggle/tweet/:id", toggleTweetLike);
router.get("/videos", getLikedVideos);

export default router;
