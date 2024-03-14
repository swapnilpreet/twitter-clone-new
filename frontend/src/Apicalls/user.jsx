import axios from "axios";
import axiosInstance from './axiosinstance.jsx'

export const SignupUser = async (payload) => {
  try {
    const response = await axios.post("/api/user/signup/user", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const SignupgoogleUser = async (payload) => {
  try {
    const response = await axios.post("/api/user/signupwithgoogle/user", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginUser = async (payload) => {
  try {
    const response = await axios.post("/api/user/login/user", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const LoginWithGoogleUser = async (payload) => {
  try {
    const response = await axios.post("/api/user/loginwithgoole/user", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetUserProfile = async (email) => {
  try {
    console.log("Getting api call ", email);
    const response = await axios.post("/api/user/get/user", { email: email });
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const GetCurrentUser = async ()=>{
  try{
    // console.log(localStorage.getItem('token'));
     const response = await axiosInstance.get('/api/user/profile');
     return response.data;
  }catch(error){
     return error.message;
  }
}

export const GetAllUser = async () => {
  try {
    const response = await axios.get("/api/user/getAllusers");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const FollowUser = async (payload) => {
  try {
    const response = await axios.put("/api/user/follow", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const VerifyUserAccount = async (payload) => {
  try {
    const response = await axios.post("/api/user/verifyAccount", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export const UserSubscription = async (payload) => {
  try {
    const response = await axios.put("/api/user/userSubscription", payload);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
