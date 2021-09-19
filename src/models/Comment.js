import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost"
  },

  authorName: {
    type: String,
    required: true
  },

  commentMessage: {
    type: String,
    required: true,
  },

  likes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;