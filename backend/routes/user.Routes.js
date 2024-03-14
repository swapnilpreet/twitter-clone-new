const UserModel = require("../models/user.model");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const crypto = require("crypto");
const authentication = require("../middleware/authentication");
require("dotenv").config();

router.post("/signup/user", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.send({
        success: false,
        message: "User already exists",   
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashpassword;
      // save user in database
      const newuser = new UserModel(req.body);
      await newuser.save();
      res.send({
        success: true,
        message: "User saved successfully",
        data: newuser,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/signupwithgoogle/user", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.send({
        success: false,
        message: "User already exists",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashpassword;
      // save user in database
      const newuser = new UserModel(req.body);
      await newuser.save();
      res.send({
        success: true,
        message: "User saved successfully",
        data: newuser,
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/get/user", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({
        success: true,
        message: "user fetched successfully",
        data: user,
      });
    } else {
      res.send({
        success: false,
        message: "user not found or error occer",
      });
    }
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.put("/follow", async (req, res) => {
  try {
    const { userId, followId } = req.body;

    const usercheck = await UserModel.findById(userId);
    if (usercheck.following.includes(followId)) {
      const user = await UserModel.findByIdAndUpdate(
        followId,
        {
          $pull: {
            followers: userId,
          },
        },
        {
          new: true,
        }
      );
      const user1 = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            following: followId,
          },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "Unfollow successfully",
        data: { user, user1 },
      });
    }else{
      const user = await UserModel.findByIdAndUpdate(
        followId,
        {
          $push: {
            followers: userId,
          },
        },
        {
          new: true,
        }
      );
      const user1 = await UserModel.findByIdAndUpdate(
        userId,
        {
          $push: {
            following: followId,
          },
        },
        {
          new: true,
        }
      );
      res.send({
        success: true,
        message: "follow successfully",
        data: { user, user1 },
      });
    }


  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
});

router.get("/getAllusers", async (req, res) => {
  try {
    const user = await UserModel.find();
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.post("/verifyAccount", async (req, res) => {
  const { userId, usertype } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      res.send({
        success: false,
        message: "User not found",
      });
    } else {
      user.isVerified = true;
      user.typeOfUser = usertype;
      await user.save();
      res.send({
        success: true,
        message: "Account verified successfully",
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

router.put("/userSubscription", async (req, res) => {
  const { userId, subscriptionToAdd } = req.body;
  const user = await UserModel.findById(userId);
  if (!user) {
    res.send({
      success: false,
      message: "User not found",
    });
  }
  if (subscriptionToAdd) {
    user.subscription = subscriptionToAdd;
    await user.save();
    res.send({
      success: true,
      message: "Subscription updated successfully",
      data: user,
    });
  } else {
    res.send({
      success: true,
      message: "Invalid payload",
    });
  }
});

router.post("/login/user", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  const sendNotificationEmail = (names, msg) => {
    const ENC_KEY = crypto.randomBytes(32).toString("hex");
    const IV = crypto.randomBytes(16).toString("hex");

    const encryptedMessage = encryptMessage(msg, ENC_KEY, IV);

    function encryptMessage(msg, ENC_KEY, IV) {
      const algorithm = "aes-256-cbc";
      const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(ENC_KEY, "hex"),
        Buffer.from(IV, "hex")
      );
      let encryptedMessage = cipher.update(msg, "utf-8", "hex");
      encryptedMessage += cipher.final("hex");
      return encryptedMessage;
    }

    let config = {
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    };

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "React-Twitter-clone.com",
        link: "https://mailgen.js/",
      },
    });

    const decryptedMessage = decryptMessage(encryptedMessage, ENC_KEY, IV);

    function decryptMessage(encryptedMessage, ENC_KEY, IV) {
      const algorithm = "aes-256-cbc";
      const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(ENC_KEY, "hex"),
        Buffer.from(IV, "hex")
      );
      let decryptedMessage = decipher.update(encryptedMessage, "hex", "utf-8");
      decryptedMessage += decipher.final("utf-8");
      return decryptedMessage;
    }

    let response = {
      body: {
        name: names,
        from: "React-Twitter Clone",
        intro: `${decryptedMessage}. Below is your email address and password that you are trying to login`,
        table: {
          data: [
            {
              Email: email,
              Password: password,
              Status: "Incorrect password",
            },
          ],
        },
        outro:
          "NOTE : If there are five failed attempts,We will automatically block your account and It will Unblock after one hour.",
      },
    };

    let mail = MailGenerator.generate(response);

    let message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Twitter Incorrect password",
      html: mail,
    };

    transporter
      .sendMail(message)
      .then(() => {
        console.log("Sent mail");
      })
      .catch((error) => {
        console.log("Sent error mail", error);
      });
  };

  try{
    if(!user){
      return  res.send({
        success: false,
        message: "User Not found",
      });
    }
    
    console.log(user.bloackuser > new Date(),user.bloackuser,new Date(),user.bloackuser-new Date())
    if(user.bloackuser && user.bloackuser > new Date()){
      return res.send({
        success: false,
        message: `Your account is currently blocked. It will be unblocked in ${calculateRemainingTime(user.bloackuser)}`,
      });
    }

    function calculateRemainingTime(blocktime) {
      const remainingTimeInSeconds = Math.ceil((blocktime - new Date()) / 1000);
      const remainingTimeminutes = Math.floor(remainingTimeInSeconds / 60);
      const remainingTimeseconds = remainingTimeInSeconds % 60;

      return `${remainingTimeminutes} minutes and ${remainingTimeseconds} seconds`;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      user.loginfailed += 1;
      await user.save();

      if (user.loginfailed === 3) {
        sendNotificationEmail(user.name, process.env.THREE);
      }
      if (user.loginfailed === 5) {
        user.bloackuser = new Date(Date.now() + 60 * 60 * 1000);
        await user.save();
        sendNotificationEmail(user.name, process.env.FIVE);
      }

      return res.send({
        success: false,
        message: user.loginfailed,
      });

    } else {
      const token = jwt.sign({userId:user._id, email:user.email},process.env.TOKEN_SECRET);

      user.loginfailed = 0;
      user.bloackuser = null;
      await user.save();
      return res.send({ success:true, data: token, message: "Login successful" });
    }
  } catch (error) {
    return res.send({ success:false, message: "Internal server error" });
  }
});



router.post("/loginwithgoole/user", async (req, res) => {
  try {
    const {email} = req.body;
    console.log("req.body",req.body)
    const user = await UserModel.findOne({ email });
    console.log(user);
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if(isPasswordValid){
      const token = jwt.sign({userId:user._id, email:user.email},process.env.TOKEN_SECRET);
      res.send({
        success: true,
        message: "Login successful",
        data: token,
      });
    }else{
      res.send({
        success: false,
        message: "Login failed incorect password",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/profile',authentication,async(req,res)=>{
  try {
      const user = await UserModel.findById(req.body.userId);
      res.send({
          success: true,
          message: "get current user successfully",
          data: user,
      })
  } catch (error) {
      res.send({
          success: false,
          message: error.message,
      })
  }
});

module.exports = router;
