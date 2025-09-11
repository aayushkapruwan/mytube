import { Router } from "express";
const router = Router();
import {addComment,deleteComment,getVideoComments,updateComment} from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
router.get("/getVideoComments/:videoId",getVideoComments);
router.post("/addComment/:videoId",verifyJWT,addComment);
router.put("/updateComment/:commentId",verifyJWT,updateComment);
router.delete("/deleteComment/:commentId",verifyJWT,deleteComment);
export default router;