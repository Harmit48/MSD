const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const authorizeRoles = require('../middleware/rbac');

let posts = [
  { id: 1, title: "Microservices Design Patterns", content: "Architecture guide...", authorId: "author_01", authorRole: "author" }
];

// 1. GET all posts: Open to Readers, Authors, Admins
router.get('/', (req, res) => {
  res.json({ success: true, count: posts.length, data: posts });
});

// 2. POST create post: Restricted to 'author' and 'admin'
router.post('/', verifyToken, authorizeRoles('author', 'admin'), (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    title,
    content,
    authorId: req.user.id,
    authorName: req.user.username,
    authorRole: req.user.role
  };
  posts.push(newPost);
  res.status(201).json({ success: true, message: "Post published", post: newPost });
});

// 3. DELETE post: Authors can delete only their own posts; Admins can delete any post
router.delete('/:id', verifyToken, authorizeRoles('author', 'admin'), (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(p => p.id === postId);

  if (!post) {
    return res.status(404).json({ success: false, message: "Post not found" });
  }

  // Ownership verification: Admin can delete anything; Author only their own post
  if (req.user.role !== 'admin' && post.authorId !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "Forbidden: You are not authorized to delete another author's publication."
    });
  }

  posts = posts.filter(p => p.id !== postId);
  res.json({ success: true, message: `Post '${post.title}' deleted successfully by ${req.user.role}` });
});

module.exports = router;