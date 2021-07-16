import routes from "../routes";
import Post from "../models/Post";
import Comment from "../models/Comment";

export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate({ path: "creator", select: "name" })
    .populate({ path: "likes", select: "name" })
    .sort({ createdAt: -1 });
  console.log(posts);
  res.render("posts", { pageTitle: "게시판", posts });
};

export const getPostDetail = async (req, res) => {
  const {
    params: { id: _id },
    user: { _id: userId },
  } = req;
  const post = await Post.findById({ _id })
    .populate({ path: "creator", select: ["name", "email", "avatarUrl"] })
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: { path: "creator", select: ["name", "avatarUrl"] },
    });
  post.views = post.views + 1;
  post.save();
  const liked = await Post.isLiked(userId, post.likes);
  console.log(liked);
  console.log(post);
  res.render("postDetail", { pageTitle: post.title, post, liked });
};

export const getAddPost = (req, res) => {
  res.render("addPost", { pageTitle: "게시글 작성하기" });
};

export const postAddPost = async (req, res) => {
  const {
    body: { title, contents },
    user,
    files,
  } = req;
  try {
    let imageUrls = [];
    if (files) {
      files.forEach((file) => {
        imageUrls.push(file.location);
      });
    }
    const post = await Post.create({
      title,
      contents,
      ...(imageUrls.length > 0 && { imageUrls }),
      creator: user.id,
    });
    user.posts.push(post);
    user.save();
    return res.redirect(routes.post);
  } catch (error) {
    req.flash("error", "게시글 작성에 실패했습니다.");
    res.status(400);
    console.log(error);
    return res.redirect(routes.post + routes.addPost);
  }
};

export const postAddComment = async (req, res) => {
  const {
    body: { contents },
    params: { id },
    user,
  } = req;
  try {
    const post = await Post.findById(id);
    const comment = await Comment.create({
      contents,
      creator: user,
      post,
    });
    post.comments.push(comment);
    post.save();
    res.json(comment);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const postToggleLike = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const post = await Post.findById(id);
    const likes = Post.toggleLike(user._id, post.likes);
    await post.updateOne({
      likes,
    });
    const liked = Post.isLiked(user._id, likes);
    user.likesPosts = Post.toggleLike(post._id, user.likesPosts);
    user.save();
    res.send(liked);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};
