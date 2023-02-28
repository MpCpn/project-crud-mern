const { getPosts, getPostById, addPost, updatePost, deletePost } = require('../controller/post');

const route = require('express').Router();

route.get('/', getPosts)
route.get('/:id', getPostById)
route.post('/', addPost)
route.put('/:id', updatePost)
route.delete('/:id', deletePost)


module.exports = route