import { publishAVideo } from "../controllers/video.controller.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllVideos } from "../controllers/video.controller.js";
import { updateVideo } from "../controllers/video.controller.js";
const router = Router();
router.route("/publishVideo").post(
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
router.put("/updateVideo/:videoId", updateVideo);

export default router;
