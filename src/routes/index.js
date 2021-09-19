import express from 'express';
import commentsRoutes from './comments';
import postsRoutes from './posts';

const router = express.Router();

router.use("/posts", postsRoutes);
router.use("/comments", commentsRoutes);

export default router;