import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost';
import Comment from "../models/Comment";
import { successResponse } from '../middlewares/responses';
import AppError from '../errors/AppError';

/**
 * Controller to get all blog posts
 * @returns response - api response with status code, message and array of blog posts sorted by created date.
 */
export const getAllBlogPosts = async (req, res, next) => {
  try {
    const data = await BlogPost.find().sort({ createdAt: -1 });
    return successResponse(res, 200, "Fetched all posts successfully!", data);
  } catch (err){
    return next(err);
  }
}

/**
 * Controller to get all blog posts paginated
 * @param {Number} req.query.pageNumber - Page Number
 * @param {Number} req.query.pageSize - Number of records to return
 * @returns response - api response with status code, message and array of paginated blog posts sorted by created date.
 */
export const getAllBlogPostsPaginated = async (req, res, next) => {
  try {
    const pageSize = Number(req.query.pageSize) || 15;
    const pageNumber = Number(req.query.pageNumber) || 1;
    if (pageSize <= 0 || pageNumber <= 0) {
      return next(new AppError("pageNumber and pageSize must be greater than 0", 400))
    }

    const docs = await BlogPost.find({})
      .skip(pageSize * pageNumber - pageSize)
      .limit(pageSize)
      .sort({ createdAt: -1 })
      .exec()

    const count = await BlogPost.countDocuments().exec();

    const response = {
      data: docs,
      totalRecords: docs.length,
      pagination: {
        currentPage: pageNumber,
        totalPages: Math.ceil(count / pageSize),
      },
    };

    /** if not last page */
    if (pageNumber < response.pagination.totalPages) {
      response.pagination.hasNextPage = true;
      response.pagination.NextPage = pageNumber + 1;
    } else {
      response.pagination.hasNextPage = false;
      response.pagination.NextPage = null;
    }

    return successResponse(res, 200, "paginated blog posts fetched successfully!", response);
  }
    catch (err) {
      return next(err);
    }
}


/**
 * Controller create a blog post
 * @param {String} req.body.authorName - Name of author of blog post
 * @param {String} req.body.title - Title of blog post
 * @param {String} req.body.body - post body
 * @returns response - api response with status code,
 * message and data of newly created post
 */
export const createBlogPost = async (req, res, next) => {
  try {
    const { authorName, title, body } = req.body;
    const data = await BlogPost.create({ authorName, title, body });
    return successResponse(res, 200, "new blog post created successfully!", data);
  } catch (error) {
    return next(error);
  }
}

/**
 * Controller to Get Single Post By Id
 * @param {string} req.params.postId - id of blog post
 * @returns response - api response with status code, message and blog post
 */
export const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!mongoose.isValidObjectId(postId)) {
      return next(new AppError("postId is not a valid blog post id", 400));
    }

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return next(new AppError("blog post with the postId does not exist!", 400));
    }

    return successResponse(res, 200, "blog post fetched successfully!", blogPost);
  } catch (error){
    return next(error);
  }
}


/**
 * Controller to Update a single blog post by Id
 * @param {string} req.params.postId - id of blog post
 * @param {String} req.body.title - Title of blog post
 * @param {String} req.body.body - post body
 * @returns response - api response with status code, message and updated blog post
 */
export const updateBlogPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!mongoose.isValidObjectId(postId)) {
      return next(new AppError("postId is not a valid blog post id", 400));
    }

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return next(new AppError("blog post with the postId does not exist!", 400));
    }

    const { title, body } = req.body;
    const updates = {};
    if (title) blogPost.title = title;
    if (body) blogPost.body = body;
    const updatedDoc = await blogPost.save();
    return successResponse(res, 200, "blog post updated successfully!", updatedDoc);
  } catch (error){
    return next(error);
  }
}


/**
 * Controller to Delete A Single Post
 * @param {string} req.params.postId - id of blog post
 * @returns response - api response with status code, message and id of post
 */
export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!mongoose.isValidObjectId(postId)) {
      return next(new AppError("postId is not a valid blog post id", 400));
    }

    const blogPost = await BlogPost.findById(postId);
    if (!blogPost) {
      return next(new AppError("blog post with the postId does not exist!", 400));
    }

    // Delete associated comments
    await Comment.deleteMany({ postId: postId });
    // Delete blog post
    await BlogPost.findByIdAndDelete(postId);
    return successResponse(res, 200, "blog post deleted successfully!", postId);
  } catch (error){
    return next(error);
  }
}