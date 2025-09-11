import { Apierror } from "../utils/Apierror.js"
import { asyncHandler } from "../utils/asynchandler.js"
import { Apiresponse } from "../utils/apiresponse.js"
import { Like } from "../models/like.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId=req.user._id
    const likeDoc=await Like.findOne({video:videoId,likedBy:userId})
    if(!likeDoc){
        const createdLike=await Like.create({video:videoId,likedBy:userId})
        return res.status(200).json(new Apiresponse(200,createdLike,"video liked"))
    }
    const deletedLike=await Like.deleteOne({_id:likeDoc._id})
    return res.status(200).json(new Apiresponse(200,{},"video unliked"))
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const userId=req.user._id
    const likeDoc=await Like.findOne({comment:commentId,likedBy:userId})
    if(!likeDoc){
        const createdLike=await Like.create({comment:commentId,likedBy:userId})
        return res.status(200).json(new Apiresponse(200,createdLike,"comment liked"))
    }
    const deletedLike=await Like.deleteOne({_id:likeDoc._id})
    return res.status(200).json(new Apiresponse(200,{},"comment unliked"))

})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const {tweetId} = req.params
    const userId=req.user._id
    const likeDoc=await Like.findOne({tweet:tweetId,likedBy:userId})
    if(!likeDoc){
        const createdLike=await Like.create({tweet:tweetId,likedBy:userId})
        return res.status(200).json(new Apiresponse(200,createdLike,"tweet liked"))
    }
    const deletedLike=await Like.deleteOne({_id:likeDoc._id})
    return res.status(200).json(new Apiresponse(200,{},"tweet unliked"))
}
)



export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    
}