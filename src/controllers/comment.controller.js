import { Comment } from "../models/comment.model.js"
import {asyncHandler} from "../utils/asynchandler.js"
import { Apierror } from "../utils/Apierror.js"
import {Apiresponse} from "../utils/apiresponse.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const {page, limit } = req.query
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        sort: {createdAt: -1},
        populate: {path: "owner", select: "username avatar"}
    }
    const aggregate = Comment.aggregate([
        {$match: {video: videoId}}
    ])
    const comments = await Comment.aggregatePaginate(aggregate, options)
    res.status(200).json(new Apiresponse(200,comments,"Comments fetched successfully"))
})

const addComment = asyncHandler(async (req, res) => {
    const {content} = req.body
    const {videoId} = req.params
    const user=req.user
    if(!content){
        throw new Apierror(400,"Content is required")
    }
    const comment=new Comment({
        content,
        video:videoId,
        owner:user._id
    })
    await comment.save()
    res.status(201).json(new Apiresponse(201,comment,"Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
     const {content} = req.body
        const {commentId} = req.params
        const user=req.user
        if(!content){
            throw new Apierror(400,"Content is required")
        }
        const comment=await Comment.findByIdAndUpdate({_id:commentId,owner:user._id},{content},{new:true})
        if(!comment){
            throw new Apierror(404,"Comment not found or you are not the owner")
        }
        res.status(200).json(new Apiresponse(200,comment,"Comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params
    const user=req.user
    const comment=await Comment.findOneAndDelete({_id:commentId,owner:user._id})
    if(!comment){
        throw new Apierror(404,"Comment not found or you are not the owner")
    }
    res.status(200).json(new Apiresponse(200,comment,"Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
