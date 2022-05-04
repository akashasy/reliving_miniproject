import  express  from 'express';
import { getPosts ,createPost } from '../controllers/posts.js';
const router=express.Router();

router.get('/',getPosts);
//Recived from posts.js
router.post('/',createPost);

export default router;
