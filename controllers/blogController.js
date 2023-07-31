const Blog = require('../models/blogModel');

exports.createBlog = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const blog = new Blog({ title, category, author: req.userId, content, image });
    await blog.save();
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog' });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

exports.filterBlogs = async (req, res) => {
  try {
    const { category, author } = req.query;
    const query = {};

    if (category) query.category = category;
    if (author) query.author = author;

    const blogs = await Blog.find(query);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blogs' });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { title, category, content, image } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to update this blog' });
    }

    blog.title = title;
    blog.category = category;
    blog.content = content;
    blog.image = image;
    await blog.save();
    res.json({ message: 'Blog updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog' });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this blog' });
    }

    await blog.remove();
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog' });
  }
};



