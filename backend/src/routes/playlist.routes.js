import { Router } from "express";
import {
  createPlaylist, getPlaylistById, updatePlaylist, deletePlaylist,
  addVideoToPlaylist, removeVideoFromPlaylist, getUserPlaylists,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/").post(createPlaylist);
router.route("/user/:userId").get(getUserPlaylists);
router.route("/:id").get(getPlaylistById).patch(updatePlaylist).delete(deletePlaylist);
router.route("/:id/add/:videoId").post(addVideoToPlaylist);
router.route("/:id/remove/:videoId").delete(removeVideoFromPlaylist);

export default router;
