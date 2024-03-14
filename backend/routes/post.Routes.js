// const { response } = require("express");
const postModel = require("../models/post.model");
const UserModel = require("../models/user.model");

const router = require("express").Router();

router.post("/create/post", async (req, res) => {
  try {
    const { User } = req.body;
    console.log(User);
    const user = await UserModel.findById(User);

    if (!user) {
        return res.send({
        success: false,
        message: "User not found",
      });
    }else{
        const currentTime = Date.now();

        if (user.subscription === "free") {
            const nonDeletedPostsCount = await postModel.countDocuments({
                User,
                createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
                deleted: { $ne: true },
              });
        
          if (
            nonDeletedPostsCount > 0 &&
            currentTime - user.lastPostTime < 24 * 60 * 60 * 1000
          ) {
            return res.send({
                success: false,
                message: "Free subscription users can post only 1 tweet per day",
              });
          }else{
            const newPost = new postModel(req.body);
            await newPost.save();
            user.lastPostTime = currentTime;
            await user.save();

            return res.json({
              success: true,
              message: "tweet created successfully",
            });
          }
        }else if (user.subscription === "silver") {
          const todayPostsCount = await postModel.countDocuments({
            User,
            createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
          });
            console.log(todayPostsCount)
          if (todayPostsCount >= 5) {
            return res.send({
                success: false,
                message: "Silver subscription users can post only 5 tweet per day",
              });
          }else{
            const newPost = new postModel(req.body);
            await newPost.save();
            user.lastPostTime = currentTime;
            await user.save();

            return res.json({
              success: true,
              message: "Post created successfully",
            });
          }
        }else{
            const newPost = new postModel(req.body);
            await newPost.save();
            user.lastPostTime = currentTime;
            await user.save();
        
            return res.json({
              success: true,
              message: "Post created successfully",
            });
        }
    }
  } catch (error) {
    res.send({
        success:false,
        message:error.message,
    })
  }
});

router.post('/getusers/post' , async(req,res)=>{
  try {
    const { userId } = req.body;
    const getAllPosts = await postModel.find({ User: userId }).populate("User");
    res.send({
      success: true,
      message: "fetching all posts successfully",
      data: getAllPosts,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/getall/post", async (req, res) => {
  try {
    const post = await postModel.find().populate("User").sort({ _id: -1 });
    res.send({
      success: true,
      message: "Post fetch successfully",
      data: post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/singlepost/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const post = await postModel.findById(id).populate("User");
    res.send({
      success: true,
      message: "Post fetch successfully",
      data: post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/followers-posts", async (req, res) => {
  try {
    const post = await postModel
      .find({ user: { $in: req.user.following } })
      .populate("postById", "_id_name")
      .populate("comments.PostedBy", "_idname");
    res.send({
      success: true,
      message: "fetching posts...",
      data: post,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.delete('/posts/:userId', async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ error: 'UserID is required' });
  }

  try {
    // Delete all posts with the specified userID
    const deleteResult = await postModel.deleteMany({ userId });
    return res.status(200).json({ message: `Deleted ${deleteResult.deletedCount} posts for user ${userId}` });
  } catch (error) {
    console.error('Error deleting posts:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
