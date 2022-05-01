import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  } catch (e) {
    res.status(404).json({ message: error.message })
  }
}

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;
  try {
    const title = new RegExp(searchQuery, 'i');

    const posts = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});

    res.json({ data: posts });
  } catch (e) {
    res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  // Get datas
  const post = req.body;
  // Then transform into mongoose schema
  const newPost = PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

  try {
    // save it
    await newPost.save()
    // and persist
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
}

export const updatePost = async (req, res) =>{
  const { id: _id } = req.params;
  const post = req.body;

  if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("Il n'y a pas de tip avec cet ID");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, {new: true});

  res.json(updatedPost);
}

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Il n'y a pas de tip avec cet ID");

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: "Tip supprimé!" });
}

export const likePost = async (req, res) => {
  const { id } = req.params;
  // First we check if user is connected
  if (!req.userId) return res.json({ message: "Vous devez être connecté pour liker" });
  // Then check if post exists
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("Il n'y a pas de tip avec cet ID");
  // Find the post which is asked by th user to like
  const post = await PostMessage.findById(id);
  // Checking if user has already like this post
  const index = post.likes.findIndex((id) => id === String(req.userId));
  // And finally add like to the post

  if ( index === -1 ){
    //like the post
    post.likes.push(req.userId)
  } else {
    //dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    post,
    { new: true }
  );

  res.json(updatedPost);

}
