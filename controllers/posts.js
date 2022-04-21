import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json(postMessages);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
}

export const createPost = async (req, res) => {
  // Get datas
  const post = req.body;
  // Then transform into mongoose schema
  const newPost = PostMessage(post);

  try {
    // save it
    await newPost.save()
    // and persist
    res.status(201).json(newPost);
  } catch (e) {
    res.status(409).json({ message: e.message });
  }
}
