import axios from "axios";
// import { axiosInstance } from "./axiosinstance";

export const AddPost = async (payload) => {
  try {
    const response = await axios.post("/api/create/post", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllPost = async () => {
  try {
    const response = await axios.get("/api/getall/post");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllUsersPost = async (userId) => {
  try {
    const response = await axios.post("/api/getusers/post",userId);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetPostByID = async (id) => {
  try {
    const response = await axios.get(`/api/singlepost/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AddBookmarks = async (payload) => {
  try {
    const response = await axios.put("/api/bookmarks/add-to-Bookmarks",payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetAllBookmarks = async (userId) => {
  // console.log('GET ALL',userId)
  try {
    const response = await axios.post("/api/bookmarks/getbookmarks",{userId:userId});
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const AddNewComment = async(payload)=>{
  try {
     const response = await axios.post("/api/comment/add/comment",payload);
     return response.data;
  } catch (error) {
    return error.message;
  }
};