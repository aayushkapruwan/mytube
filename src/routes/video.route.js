import { publishAVideo, getAllVideos, updateVideo, deleteVideo, togglePublishStatus, viewCountIncrease, getVideoById } from "../controllers/video.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/publishAVideo").post(
  verifyJWT,
  upload.fields([
    {
      name: "Video",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishAVideo
);

router.route("/getAllvideos").get(getAllVideos)
router.route("/:videoId").get(getVideoById);
router.put(
  "/updateVideo/:videoId",
  upload.single("thumbnail"), // Handle thumbnail if uploaded
  updateVideo
);
router.delete("/deleteVideo/:videoId", verifyJWT, deleteVideo)
router.patch("/togglePublishStatus/:videoId", verifyJWT, togglePublishStatus);
router.get("/viewCountIncrease/:videoId", viewCountIncrease);
export default router;
