import routes from "../routes";
import Post from "../models/Post";
import Comment from "../models/Comment";
import Reply from "../models/Reply";
import { deleteFile } from "../upload";

const filterList = (id, list = []) => {
  return list.filter((item) => item.toString() !== id.toString());
};

export const getPosts = async (req, res) => {
  const {
    query: { page, limit },
  } = req;
  const pageNum = page ? +page : 1;
  const limitCount = limit ? +limit : 20;
  const skip = (pageNum - 1) * limitCount;
  const posts = await Post.find()
    .populate({ path: "creator", select: "name" })
    .populate({ path: "likes", select: "name" })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitCount);
  const postCount = await Post.count();
  const maxPage = Math.round(postCount / limitCount);
  const pageList = [];
  const n = maxPage < 5 ? maxPage : 5;
  for (let i = 0; i < n; i++) {
    if (pageNum <= 3) {
      pageList.push(i + 1);
    } else if (pageNum >= maxPage - 2) {
      pageList.push(maxPage - n + i + 1);
    } else {
      pageList.push(pageNum + 2 - i);
    }
  }
  res.render("posts", { pageTitle: "게시판", posts, pageList, pageNum, skip });
};

export const getPostDetail = async (req, res) => {
  const {
    params: { id },
    user: { _id: userId },
  } = req;
  const post = await Post.findById(id)
    .populate({ path: "creator", select: ["name", "email", "avatarUrl"] })
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: [
        { path: "creator", select: ["name", "avatarUrl"] },
        {
          path: "replies",
          populate: { path: "creator", select: ["name", "avatarUrl"] },
        },
      ],
    });
  post.views = post.views + 1;
  post.save();
  const liked = await Post.isLiked(userId, post.likes);
  // console.log(liked);
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
    req.flash("success", "게시글이 성공적으로 작성 되었습니다.");
    return res.redirect(routes.post);
  } catch (error) {
    req.flash("error", "게시글 작성에 실패했습니다.");
    res.status(400);
    console.log(error);
    return res.redirect(routes.post + routes.addPost);
  }
};

export const getDeletePost = async (req, res) => {
  const {
    params: { id },
    user,
  } = req;
  try {
    const post = await Post.findById(id).populate("creator").populate("likes");
    console.log(post);
    console.log(post.creator._id.toString() !== user._id.toString());
    if (post.creator._id.toString() !== user._id.toString()) {
      throw Error;
    }
    const comments = await Comment.find({ post });
    comments.forEach(async (comment) => {
      await Reply.deleteMany({ comment });
    });
    await Comment.deleteMany({ post });
    post.creator.posts = filterList(id, post.creator.posts);
    await post.creator.save();
    post.likes.forEach(async (likeUser) => {
      await likeUser.updateOne({
        likesPosts: filterList(id, likeUser.likesPosts),
      });
    });
    post.imageUrls.forEach(async (url) => await deleteFile(url));
    await Post.deleteOne(post);
    req.flash("success", "게시글이 성공적으로 삭제 되었습니다.");
    return res.redirect(routes.post);
  } catch (error) {
    req.flash("error", "게시글 삭제에 실패했습니다.");
    console.log(error);
    return res.redirect(routes.postDetail(id));
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
      post: post._id,
    });
    post.comments.push(comment);
    await post.save();
    res.json(comment);
  } catch (error) {
    res.status(400);
    console.log(error);
  } finally {
    res.end();
  }
};

export const postAddReply = async (req, res) => {
  const {
    body: { contents },
    params: { id },
    user,
  } = req;
  try {
    const comment = await Comment.findById(id);
    const reply = await Reply.create({
      contents,
      creator: user,
      comment: comment._id,
    });
    comment.replies.push(reply);
    await comment.save();
    res.json(reply);
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
