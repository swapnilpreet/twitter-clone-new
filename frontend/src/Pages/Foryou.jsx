import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button } from "@chakra-ui/react";
import "./foryou.css";
import { FaRegImage } from "react-icons/fa6";
import { MdOutlineGifBox } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { MdSchedule } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import Media from "./Media";
import EmojiPicker from "./EmojiPicker";
import axios from "axios";
import { AddPost, GetAllPost } from "../Apicalls/post";
import {useSelector} from 'react-redux';
import { useToast } from '@chakra-ui/react'
import { GoVideo } from "react-icons/go";
import { MdCancel } from "react-icons/md";

const Foryou = () => {
  const toast = useToast()
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const [video, setVideo] = useState();
  const [Image, setImage] = useState();
  const inputVideo = useRef(null);
  const inputFileImage = useRef(null);
  const [text, setText] = useState("");
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const user = useSelector((state)=>state?.users?.user);

  const handleEmojiSelect = (emoji) => {
    setText((prevText) => prevText + emoji);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      const videoUrl = URL.createObjectURL(file);
      setPreviewVideoUrl(videoUrl);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const ImageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(ImageUrl);
    }
  };

  const uploadFile = async (type) => {
    const data = new FormData();
    data.append("file", type === "image" ? Image : video);
    data.append(
      "upload_preset",
      type === "image" ? "imges_preset" : "video_preset"
    );
    try {
      let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = type === "image" ? "image" : "video";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const imageUrl = await uploadFile("image");
      const videoUrl = await uploadFile("video");

      const payload = {
        content: text,
        videoUrl,
        imageUrl,
        User:user._id,
      };
      const response = await NewPost(payload);
      setPreviewVideoUrl("");
      setPreviewImageUrl("")
    } catch (error) {
      console.log("error", error);
    }
  };

  const NewPost = async (payload) => {
    try {
      const response = await AddPost(payload);
      if (response.success) {
        getAllPost();
        setloading(false);
        setVideo();
        setImage();
        setText("");
      } else {
        setloading(false);
        throw new Error(response.message);
      }
    } catch (error) {
      setloading(false);
      console.log(error.message);
      toast({
        title: 'Order Creating Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  };

  const getAllPost = async() => {
    try {
      const response = await GetAllPost();
      if(response){
        setVideo();
        setImage();
        setposts(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

 
  
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundColor: "black",
      }}
    >
      <div className="postBox">
        <div className="postIng">
          <img className="rounded-full w-12 border border-solid m-auto" src={user?.ProfilePicture} alt="pic" />
        </div>

        <div className="values">
          <form onSubmit={handleSubmit}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What is happening?!"
              id=""
            ></textarea>
            <hr />

            {previewVideoUrl && (
              <div className="relative border p-2">
              <video width="100%" controls>
                <source src={previewVideoUrl} />
              </video>
              <MdCancel size={30} className="absolute cursor-pointer top-4 right-4" onClick={
                ()=>{
                setPreviewVideoUrl("") ; setVideo()
                }
                }/>
              </div>
            )}

            {previewImageUrl && (<div className="relative border p-2">
              <img src={previewImageUrl} alt="pic" />
              <MdCancel size={30} className="absolute cursor-pointer top-4 right-4" onClick={()=>{ setPreviewImageUrl("") ; setImage()}}/>
            </div> 
            )}


            <div className="sm:flex inline-block gap-1 text-center items-center justify-between">
              <div className="flex gap-5">

                <GoVideo
                  size={22}
                  onClick={() => inputVideo.current.click()}
                />
                <FaRegImage
                  size={22}
                  onClick={() => inputFileImage.current.click()}
                />
                <CiBoxList size={22} />
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                <MdSchedule size={22} />
                <CiLocationOn size={22} />
                <input
                  type="file"
                  onChange={handleChange}
                  ref={inputVideo}
                  style={{ display: "none" }}
                />
                <input
                  type="file"
                  onChange={handleChangeImage}
                  ref={inputFileImage}
                  style={{ display: "none" }}
                />
              </div>

              <div>
                <Button
                  isLoading={loading}
                  loadingText="Posting"
                  colorScheme="blue"
                  variant="solid"
                  type="Submit"
                  borderRadius={"25px"}>
                  Post
                </Button>
              </div>

            </div>

          </form>
        </div>
        
      </div>
      <div className="overflow-scroll">
         <Media posts={posts}/>
      </div>
    </div>
  );
};

export default Foryou;
