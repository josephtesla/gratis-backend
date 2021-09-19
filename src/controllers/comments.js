import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost';
import Comment from "../models/Comment";
import { successResponse, errorResponse } from '../middlewares/responses';
import AppError from '../errors/AppError';


/**
 * Controller to Create Comment on a blog post
 * @param {string} req.params.postId - id of blog post
 * @param {string} req.body.authorName - name of comment's author
 * @param {string} req.body.commentMessage - comment
 * @returns response - api response with status code, message and comment data
 */
export const createNewComment = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const isValid = (mongoose.isValidObjectId(postId)) && await BlogPost.findById(postId);
    if (!isValid) {
      return next(new AppError("invalid post id. post does not exist!", 404));
    }

    const { authorName, commentMessage } = req.body;
    const data = await Comment.create({ postId, authorName, commentMessage });
    return successResponse(res, 200, "comment created successfully!", data);
  } catch (error){
    return next(error);
  }
}


/**
 * Controller to Get Comment By Id
 * @param {string} req.params.commentId - id of comment
 * @returns response - api response with status code, message and comment
 */
export const getCommentById = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    if (!mongoose.isValidObjectId(commentId)) {
      return next(new AppError("commentId is not a valid id", 400));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError("comment does not exist!", 404));
    }

    return successResponse(res, 200, "comment fetched successfully!", comment);
  } catch (error){
    return next(error);
  }
}


/**
 * Controller to get all comments on a post.
 * @param {string} req.params.postId - post Id
 * @returns response - api response with status code, message and array comments sorted by date.
 * */
export const getAllComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const isValid = (mongoose.isValidObjectId(postId)) && await BlogPost.findById(postId);
    if (!isValid) {
      return next(new AppError("invalid post id. post does not exist!", 404));
    }

    const data = await Comment.find({ postId }).sort({ createdAt: -1 });
    return successResponse(res, 200, "fetched all comments successfully!", data);
  } catch (err){
    return next(err);
  }
}

/**
 * Controller to Update a single comment post by Id
 * @param {string} req.params.commentId - id of comment
 * @param {String} req.body.commentMessage - comment
 * @returns response - api response with status code, message and updated comment
 */
export const updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    if (!mongoose.isValidObjectId(commentId)) {
      return next(new AppError("commentId is not a valid id", 400));
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return next(new AppError("comment does not exist!", 400));
    }

    const { commentMessage } = req.body;
    const updates = {};
    if (commentMessage) comment.commentMessage = commentMessage;
    const updatedDoc = await comment.save();
    return successResponse(res, 200, "comment updated successfully!", updatedDoc);
  } catch (error){
    return next(error);
  }
}

/**
 * Controller to Delete A Single Comment
 * @param {string} req.params.commentId - id of comment to delete
 * @returns response - api response with status code, message and id of comment
 */
export const deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const isValid = (mongoose.isValidObjectId(commentId)) && await Comment.findById(commentId);
    if (!isValid) {
      return next(new AppError("invalid comment id. comment does not exist!", 404));
    }

    await Comment.findByIdAndDelete(commentId);
    return successResponse(res, 200, "comment deleted successfully!", commentId);
  } catch (error) {
    return next(error);
  }
}