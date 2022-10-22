import express from 'express';

import mongoose from 'mongoose';
import Post from '../db/posts.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const allPosts = await Post.find()
      res.json(allPosts)
    } catch (error) {
      console.log(error)
    }
  })

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        res.status(200).json(post);    
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const post = req.body;
    const newPost = new Post(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id} = req.params;
        const {title,message,creator} = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).res.status(409).json({ message: "Geçersiz ID" });
        const updatedPost = { creator, title, message, _id: id };
        await Post.findByIdAndUpdate(id, updatedPost, { new: true });
        res.status(200).json(updatedPost); 
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "Geçersiz ID" });
        await Post.findByIdAndRemove(id)
        res.status(200).json({ message: "Silindi" });    
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

export default router;