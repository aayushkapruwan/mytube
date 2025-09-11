import { Playlist } from "../models/playlist.model.js";
import { Apierror } from "../utils/Apierror.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Apiresponse } from "../utils/apiresponse.js";
import { Video } from "../models/video.model.js";
import {User} from "../models/user.model.js"
const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    throw new Apierror(400, "Playlist name is required");
  }
  if (name.length < 3 || name.length > 50) {
    throw new Apierror(
      400,
      "Playlist name must be between 3 and 50 characters"
    );
  }
  if (description && (description.length < 10 || description.length > 300)) {
    throw new Apierror(
      400,
      "Playlist description must be between 10 and 300 characters"
    );
  }
  const user = req.user;
  const playlist = await Playlist.create({
    name,
    description,
    owner: user._id,
  });
  return res
    .status(201)
    .json(new Apiresponse(201, playlist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user=await User.findById({_id:userId});
  if(!user){
    throw new Apierror(404,"User not found");
  }
    const playlists = await Playlist.find({ owner: userId }).populate("videos");
    return res
    .status(200)
    .json(new Apiresponse(200, playlists, "User playlists fetched successfully"));
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await Playlist.findById({ _id: playlistId }).populate("videos");
  if (!playlist) {
    throw new Apierror(404, "Playlist not found");
  }
  return res
    .status(200)
    .json(new Apiresponse(200, playlist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  const playlist = await Playlist.findById({ _id: playlistId });
    if (!playlist) {
    throw new Apierror(404, "Playlist not found");
    }
    const video = await Video.findById({ _id: videoId });
    if (!video) {
    throw new Apierror(404, "Video not found");
    }
    if (playlist.videos.includes(videoId)) {
    throw new Apierror(400, "Video already exists in playlist");
    }
    playlist.videos.push(videoId);
    await playlist.save();
    return res
    .status(200)
    .json(new Apiresponse(200, playlist, "Video added to playlist successfully"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
    const playlist = await Playlist.findById({ _id: playlistId });
    if (!playlist) {
    throw new Apierror(404, "Playlist not found");
    }
    const video = await Video.findById({ _id: videoId });
    if (!video) {
    throw new Apierror(404, "Video not found");
    }

    if (!playlist.videos.includes(videoId)) {
    throw new Apierror(400, "Video does not exist in playlist");
    }
    playlist.videos = playlist.videos.filter((video)=>video.toString() !== videoId.toString());
    await playlist.save();
    return res
    .status(200)
    .json(new Apiresponse(200, playlist, "Video removed from playlist successfully"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist =await Playlist.findById({ _id: playlistId });
    if (!playlist) {
    throw new Apierror(404, "Playlist not found");
    }
    await Playlist.findByIdAndDelete({ _id: playlistId });
    return res
    .status(200)
    .json(new Apiresponse(200, null, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  const playlist = await Playlist.findById({ _id: playlistId });
  if (!playlist) {
    throw new Apierror(404, "Playlist not found");
  }
  playlist.name = name || playlist.name;
  playlist.description = description || playlist.description;
  await playlist.save();
  return res
    .status(200)
    .json(new Apiresponse(200, playlist, "Playlist updated successfully"));

});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
