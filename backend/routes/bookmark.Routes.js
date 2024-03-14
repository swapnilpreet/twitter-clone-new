const UserModel = require("../models/user.model");

const router = require("express").Router();

router.put("/add-to-Bookmarks", async (req, res) => {
  const { userId } = req.body;
  const { prodId } = req.body;
  console.log(userId, prodId);
  try {
    const user = await UserModel.findById(userId);
    const alreadyAdded = user.Bookmarks.find((id) => id.toString() === prodId);
    if (alreadyAdded) {
      let user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            Bookmarks: prodId,
          },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "Bookmarks updated successfully",
        data: user,
      });
    } else {
      let user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: { Bookmarks: prodId },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "Bookmarks updated successfully",
        data: user,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/getbookmarks", async (req, res) => {
  // const {userId} = req.body;
  // console.log(userId);

  const { userId } = req.body;
  console.log("userId", userId);
  try {
    const findUsersBookmarks = await UserModel.findById(userId).populate({ 
      path: 'Bookmarks',
      populate: {
        path: 'User',
      } 
   })
    console.log(findUsersBookmarks);
    res.send({
      success: true,
      message: "Bookmarks was successfully",
      data: findUsersBookmarks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
