const express = require('express');
const blogController = require('../controllers/blogController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(authMiddleware.authenticateUser);

router.post('/', blogController.createBlog);
router.get('/', blogController.getAllBlogs);
router.get('/filter', blogController.filterBlogs);
router.patch('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);

module.exports = router;

