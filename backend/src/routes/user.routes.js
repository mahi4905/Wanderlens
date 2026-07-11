import { Router } from "express";
import {
  getCurrentUser, updateAccountDetails, updateUserAvatar,
  updateUserCoverImage, getUserChannelProfile, getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.get("/me", getCurrentUser);
router.patch("/update-account", updateAccountDetails);
router.patch("/avatar", upload.single("avatar"), updateUserAvatar);
router.patch("/cover-image", upload.single("coverImage"), updateUserCoverImage);
router.get("/c/:username", getUserChannelProfile);
router.get("/history", getWatchHistory);

export default router;
