const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const UserModel = require("../models/user.model");

router.post("/order", async (req, res) => {
  const { email, amount, userId } = req.body;

  const user = await UserModel.findById(userId);
  if (user.email === email) {
    let instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.SECRET_KEY,
    });

    var option = {
      amount: amount * 1000,
      currency: "INR",
    };

    instance.orders.create(option, function (err, order) {
      if (err) {
        return res.send({
          success: false,
          message: err,
        });
      } else {
        return res.send({
          success: true,
          message: "Order created successfully",
          data: order,
        });
      }
    });
  }
  if (!user) {
    return res.send({
      success: false,
      message: "user not found",
    });
  }
  if (user.email !== email) {
    return res.send({
      success: false,
      message: "user Email not mached",
    });
  }
});

router.post("/verify", async (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignture = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  if (expectedSignture === req.body.response.razorpay_signature) {
    return res.send({
      success: true,
      message: "Payment successfully Completed",
    });
  } else {
    return res.send({
      success: false,
      message: "signature Invalid",
    });
  }
});

router.post("/postTweet", async (req, res) => {
  const { userId } = req.body;
  const user = await UserModel.findById(userId);

  const currentTime = Date.now();

  // Check if user can post a tweet
  if (
    !user.lastPostTime ||
    currentTime - user.lastPostTime >= 24 * 60 * 60 * 1000
  ) {
    // Allow the user to post a tweet
    // Update the last post time for the user
    user.lastPostTime = currentTime;

    return res.json({ message: "Tweet posted successfully" });
  } else {
    // User has already posted a tweet in the last 24 hours
    return res
      .status(400)
      .json({ message: "You can post only one tweet per day" });
  }
});

router.post("/subcribe/order", async (req, res) => {

  const { amount } = req.body;

  let instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
  });

  var option = {
    amount: amount*10,
    currency: "INR",
  };

  instance.orders.create(option, function (err, order) {
    if (err) {
      return res.send({
        success: false,
        message: err,
      });
    } else {
      return res.send({
        success: true,
        message: "Order created successfully",
        data: order,
      });
    }
  });
});

router.post("/subcribe/verify", async (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var expectedSignture = crypto
    .createHmac("sha256", process.env.SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  if (expectedSignture === req.body.response.razorpay_signature) {
    return res.send({
      success: true,
      message: "Payment successfully Completed",
    });
  } else {
    return res.send({
      success: false,
      message: "signature Invalid",
    });
  }
});

module.exports = router;
