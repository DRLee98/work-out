import Post from "../models/Post";

export const getPosts = async (req, res) => {
  const posts = await Post.find();
  res.render("posts", { pageTitle: "게시판", posts });
};

export const getAddPost = (req, res) => {
  res.render("addPost", { pageTitle: "게시글 작성하기" });
};

export const postAddPost = async (req, res) => {
  const posts = await Post.find();
  res.render("posts", { pageTitle: "게시판", posts });
};
