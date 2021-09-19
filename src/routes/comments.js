import express from 'express';
import {
  createNewComment,
  getAllComments,
  getCommentById,
  deleteComment,
  updateComment
} from '../controllers/comments';
import joiMiddleware from '../middlewares/joiMiddleware';
import schemas from '../middlewares/validators';

const router = express.Router();

router.get("/post/:postId", getAllComments)
router.post("/post/:postId", joiMiddleware(schemas.createCommentValidator), createNewComment);
router.get("/:commentId", getCommentById);
router.put("/:commentId", updateComment);
router.delete("/:commentId", deleteComment);

export default router;