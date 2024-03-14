const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password:{
    type: String,
    required: true,
  },
  ProfilePicture: {
    type: String,
    default: "https://bit.ly/dan-abramov",
  },
  Likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  Bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  typeOfUser:{
    type:String,
    default: "",
  },
  subscription:{
    type:String,
    default: "free",
  },
  lastPostTime:{
    type:Date,
    default: null,
  },
  loginfailed:{
    type:Number,
    default: 0
  },
  bloackuser:{
    type:Date,
    default: null,
  },
  backgroundImage:{
    type:String,
    default: "https://images.unsplash.com/photo-1690138871287-02b2fc3b87c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHR3aXR0ZXIlMjBYfGVufDB8fDB8fHww"
  },
  city:{
    type:String,
  }
},{timestamps:true});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
