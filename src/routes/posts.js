import express from 'express';
import {
  createBlogPost,
  deletePost,
  getAllBlogPosts,
  getAllBlogPostsPaginated,
  getPostById,
  updateBlogPost
} from '../controllers/posts';
import joiMiddleware from '../middlewares/joiMiddleware';
import schemas from '../middlewares/validators';


const router = express.Router();

router.post("/", joiMiddleware(schemas.createPostValidator), createBlogPost);
router.get("/", getAllBlogPosts)
router.get("/paginated", getAllBlogPostsPaginated);
router.get("/:postId", getPostById);
router.put("/:postId",  joiMiddleware(schemas.createPostValidator), updateBlogPost);
router.delete(":/postId", deletePost);

export default router;