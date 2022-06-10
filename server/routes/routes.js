const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const auth = require("../middlewares/auth");

router.get("/", API.fetchAllPost);

router.post("/", API.createPost);

router.patch("/:id", API.updatePost);

router.delete("/:id", API.deletePost);

router.get("/:id", API.fetchPostByID);

module.exports = router;