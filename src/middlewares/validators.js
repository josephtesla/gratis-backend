import Joi from "joi";

const schemas = {
  createPostValidator: Joi.object({
    authorName: Joi.string().required().min(3).messages({
      "string.min": "authorName must contain at least 3 characters !",
      "any.required": "authorName is required !"
    }),

    title: Joi.string().required().min(3).messages({
      "string.min": "title must contain at least 3 characters !",
      "any.required": "title is required !"
    }),

    body: Joi.string().required().messages({
      "any.required": "body is required !"
    }),
  }),

  updatePostValidator: {
    title: Joi.string().min(3).messages({
      "string.min": "title must contain at least 3 characters !",
    }),
  },

  createCommentValidator: {
    authorName: Joi.string().required().min(3).messages({
      "string.min": "authorName must contain at least 3 characters !",
      "any.required": "authorName is required !"
    }),

    commentMessage: Joi.string().required().messages({
      "any.required": "commentMessage is required !"
    }),
  },
}

export default schemas;