import mongoose from "mongoose";

//this is used when generating new post

const postSchema = new mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const PostSchema = mongoose.model("Post", postSchema);

export default PostSchema;
