const CommentModel = require('../models/comment.model');
const postModel = require('../models/post.model');

const router = require('express').Router();

router.post('/add/comment',async(req,res)=>{
    // console.log(req.body)
    const {postId} = req.body;
    try {
        // const post = await postModel.findById(req.body.postId);
        const Newcomment = new CommentModel(req.body);
        await Newcomment.save();
        console.log("Newcomment",Newcomment)
        console.log("Newcomment.id",Newcomment._id)
        let user = await postModel.findByIdAndUpdate(
            postId,
            {
                $push: {
                comments: Newcomment._id,
              },
            },
            {
              new: true,
            }
          );
        res.send({
            success: true,
            message: 'Comment added successfully',
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

router.get('/getAll/comments',async(req,res)=>{
    try {
        const {postId} = req.body;
        const getsAll = await CommentModel.findById(postId).populate("User")
        res.send({
            success: true,
            message: 'fetching successfully',
            data:getsAll
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


module.exports = router