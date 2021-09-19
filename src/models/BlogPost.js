import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  authorName: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  body: {
    type: String,
    default: ""
  },

  likes: {
    type: Number,
    default: 0
  },
}, {
  timestamps: true
})

const BlogPost = mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;