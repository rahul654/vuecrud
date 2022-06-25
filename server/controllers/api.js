const Post = require("../models/posts");
const Comment = require("../models/comment");
const fs = require("fs");


module.exports = class API {
  // fetch all posts
  static async fetchAllPost(req, res) {
    console.log("fetchAllPost hits")
    try {
      const posts = await Post.find().populate('comments');
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
      const post = await Post.findById(id).populate('comments');
      res.status(200).json(post);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }



  // create a post
  static async createPost(req, res) {
    console.log("createPost hits")
    const { title, category, content } = req.body;
    let postedBy = req.user.username;

    let post = {
      title, category, content, postedBy
    }

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
      let post = await Post.findById(id);
      if (post?.postedBy !== req?.user?.username) {
        return res.status(401).json({ message: "not authorized" });
      }

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
      let post = await Post.findById(id);
      if (post?.postedBy !== req?.user?.username) {
        return res.status(401).json({ message: "not authorized" });
      }

      await Post.findByIdAndDelete(id);
      res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }


  // add a comment
  static async addComment(req, res) {
    console.log("addComment hits")
    const id = req.params.id;

    const { comment } = req.body;
    let username = req.user.username;
    try {
      const newComment = new Comment({
        author: username,
        comment: comment
      });
      newComment.save((err, result) => {
        if (err) {
          res.status(400).json({ message: err.message });
        } else {
          Post.findById(id, (posterr, post) => {
            if (posterr) {
              res.status(400).json({ message: posterr.message });
            } else {
              post.comments.push(result);
              post.save((saverr, result) => {
                if (saverr) {
                  res.status(400).json({ message: saverr.message });
                } else {
                  Post.findById(id).populate('comments')
                    .then((result) => {
                      const comments = result?.comments;
                      res.status(200).json({ comments });
                    })
                    .catch((err) => {
                      res.status(400).json({ message: err.message });
                    });
                }
              });
            }
          })
        }
      })
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};