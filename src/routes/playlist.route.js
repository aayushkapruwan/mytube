import { Router } from "express";
const router = Router();
import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "../controllers/playlist.controller.js";
import {
  addVideoToPlaylist,
  removeVideoFromPlaylist,
} from "../controllers/playlist.controller.js";
import {
  getPlaylistById,
  getUserPlaylists,
} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
router.post("/createPlaylist", verifyJWT, createPlaylist);
router.get("/getUserPlaylists/:userId", verifyJWT, getUserPlaylists);
router.get("/getPlaylistById/:playlistId", verifyJWT, getPlaylistById);
router.put(
  "/addVideoToPlaylist/:playlistId/:videoId",
  verifyJWT,
  addVideoToPlaylist
);
router.put(
  "/removeVideoFromPlaylist/:playlistId/:videoId",
  verifyJWT,
  removeVideoFromPlaylist
);
router.delete("/deletePlaylist/:playlistId", verifyJWT, deletePlaylist);
router.put("/updatePlaylist/:playlistId", verifyJWT, updatePlaylist);
export default router;
