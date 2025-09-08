import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Apierror } from "../utils/ApiError.js";
import { Apiresponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cloudinaryUpload } from "../utils/cloudinary.js";
import * as fs from "fs";

const getAllVideos = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const [videos, total] = await Promise.all([
    Video.find()
      .sort({ createdAt: -1 }) // newest videos first
      .skip(skip)
      .limit(limit),
    Video.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);
  if (page > totalPages) {
    return res
      .status(404)
      .json(new ApiResponse(404, [], "No more videos available"));
  }

  res.status(200).json(
    new Apiresponse(
      200,
      {
        page,
        limit,
        totalPages,
        totalVideos: total,
        videos,
      },
      "All videos fetched successfully"
    )
  );
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new Apierror(400, "please give videoId");
  }
  const { title, description, thumbnail } = req.body;
    if (!(title || description) ) {
    throw new Apierror(400, "please fill the values to be updated");
  }
  const video = await Video.findOne({ _id: videoId });
  if (title) {
    video.title = title;
  }
  if (description) {
    video.description = description;
  }
  if (thumbnail) {
    video.thumbnail = thumbnail;
  }

  const updatedVideo = await video.save();
  if (!updatedVideo) {
    throw new Apierror(
      500,
      "video can't be updated due to some internal error"
    );
  }
  return res
    .status(200)
    .json(new Apiresponse(200, updateVideo, "video updated successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  if (
    [title, description].some((it) => {
      it?.trim() === "";
    })
  ) {
    throw new Apierror(400, "please enter title and description correctly");
  }
  const videoLocalPath = req.files?.Video[0].path;
  const thumbnailLocalPath = req.files?.thumbnail[0].path;
  if (!videoLocalPath) {
    throw new Apierror(400, "please upload the video");
  }
  if (!thumbnailLocalPath) {
    throw new Apierror(400, "please upload the thumbnail");
  }
  const videoCloud = await cloudinaryUpload(videoLocalPath);
  const thumbnailCloud = await cloudinaryUpload(thumbnailLocalPath);
  if (!videoCloud) {
    fs.unlink(thumbnailLocalPath);
  }
  if (!thumbnailCloud) {
    fs.unlink(videoLocalPath);
  }
  const publishedVideo = await Video.create({
    videoFile: videoCloud.url,
    thumbnail: thumbnailCloud.url,
    owner: req.user._id,
    title: title,
    description: description,
    duration: videoCloud.duration,
  });
  if (!publishedVideo) {
    throw new Apierror(500, "video not uploaded due to some server error");
  }

  res
    .status(200)
    .json(new Apiresponse(200, publishedVideo, "video uploaded successfullt"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new Apierror(400, "please pass the videoId");
  }
  const video = await Video.findOne({ _id: videoId });
  if (!video) {
    throw new Apierror(400, "video not found");
  }
  return res.status(200).json(new ApiResponse(200, video, "video found"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new Apierror(400, "please send  videoId");
  }
  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    throw new Apierror(400, "the given video id is not valid");
  }
  const del = await Video.deleteOne({ _id: videoId });
  if (!del.acknowledged) {
    throw new Apierror(
      500,
      "video can't be deleted due to some internal server error"
    );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "the requested video is deleted"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new Apierror(400, "plase enter videoId");
  }
  const video = await Video.findOne({ _id: videoId });
  if (!video) {
    throw new Apierror(400, "plase give a valid video id");
  }
  video.status = !video.status;
  const updatedVideo = await video.save();
  if (!updatedVideo) {
    throw new Apierror(
      500,
      "status can't be updated please try after sometime"
    );
  }
  return res.status(
    200,
    updateVideo,
    `status of video is ${video.status} after updation`
  );
});

const viewCount = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "invalid videoid");
  }
  const video = await Video.findOne({ _id: videoId });
  if (!video) {
    throw new ApiError(400, "video not found");
  }
  video.views = video.views++;
  const updatedVideo = await user.save();

  if (!updatedVideo) {
    throw new ApiError(500, "internal server error");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideo, "view count increased successfully")
    );
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  viewCount,
};
