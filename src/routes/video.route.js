import { publishAVideo } from "../controllers/video.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos } from "../controllers/video.controller.js";
import { updateVideo } from "../controllers/video.controller.js";
import { deleteVideo } from "../controllers/video.controller.js";
import { togglePublishStatus } from "../controllers/video.controller.js";
import { viewCountIncrease } from "../controllers/video.controller.js";
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

router.route("/getAllvideos").get(
  verifyJWT,
  getAllVideos
)
router.put(
  "/updateVideo/:videoId",
  upload.single("thumbnail"), // Handle thumbnail if uploaded
  updateVideo
);
router.delete("/deleteVideo/:videoId", verifyJWT, deleteVideo)
router.patch("/togglePublishStatus/:videoId", verifyJWT, togglePublishStatus);
router.get("/viewCountIncrease/:videoId", viewCountIncrease);
export default router;
