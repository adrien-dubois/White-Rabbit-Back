import express from 'express';
import auth from '../middleware/auth.js'
import {
  createPost,
  deletePost,
  getPosts,
  getPostsBySearch,
  likePost,
  updatePost
} from '../controllers/posts.js';

const router = express.Router();

// http://localhost:5000/posts
router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
