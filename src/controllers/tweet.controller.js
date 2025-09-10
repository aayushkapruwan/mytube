import { Apiresponse } from "../utils/ApiResponse.js";
import { Tweet } from "../models/tweet.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Apierror } from "../utils/ApiError.js";

const createTweet = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const user = req.user;
  if (!content || content.length < 1 || content.length > 280) {
    throw new Apierror(
      400,
      "Content is required and should be between 1 and 280 characters"
    );
  }
  const tweet = new Tweet({ content, owner: user._id });
  await tweet.save();
  res
    .status(201)
    .json(new Apiresponse(201, tweet, "Tweet created successfully"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  const { userId } = await req.params;
  // const user = req.user;
  const tweets = await Tweet.find({ owner: userId }).sort({ createdAt: -1 });
  // const tweets = await Tweet.find({ owner: user._id }).sort({ createdAt: -1 });
  res
    .status(200)
    .json(new Apiresponse(200, tweets, "User tweets fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const { content } = req.body;
  const user = req.user;
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Apierror(404, "Tweet not found");
  }
  if (tweet.owner.toString() !== user._id.toString()) {
    throw new Apierror(403, "You are not authorized to update this tweet");
  }
  if (!content || content.length < 1 || content.length > 280) {
    throw new Apierror(
      400,
      "Content is required and should be between 1 and 280 characters"
    );
  }

  tweet.content = content;
  await tweet.save();
  res
    .status(200)
    .json(new Apiresponse(200, tweet, "Tweet updated successfully"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const user = req.user;
  const tweet = await Tweet.findById(tweetId);
  if (!tweet) {
    throw new Apierror(404, "Tweet not found");
  }
  if (tweet.owner.toString() !== user._id.toString()) {
    throw new Apierror(403, "You are not authorized to delete this tweet");
  }
  await Tweet.findByIdAndDelete(tweetId);
  res
    .status(200)
    .json(new Apiresponse(200, null, "Tweet deleted successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
