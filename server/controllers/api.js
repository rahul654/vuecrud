const Post = require("../models/posts");
const fs = require("fs");

module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    console.log("fetchAllPost hits")
    try {
      const posts = await Post.find();
      res.status(200).json(posts);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }



  // fetch post by ID
  static async fetchPostByID(req, res) {
    console.log("fetchPostByID hits")
    const id = req.params.id;
    try {
      const post = await Post.findById(id);
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }



  // create a post
  static async createPost(req, res) {
    console.log("createPost hits")
    const post = req.body;
    try {
      await Post.create(post);
      res.status(201).json({ message: " Post created successfully ! " });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


  // update a post
  static async updatePost(req, res) {
    console.log("updatePost hits")
    const id = req.params.id;

    const newPost = req.body;
    try {
      await Post.findByIdAndUpdate(id, newPost);
      res.status(200).json({ message: 'Post updated successfully!' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }

  // delete a post
  static async deletePost(req, res) {
    console.log("deletePost hits")
    const id = req.params.id;
    try {
      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};