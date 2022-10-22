import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
});

const Post = mongoose.model('posts', postSchema);
export default Post;