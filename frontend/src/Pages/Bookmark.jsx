import React, { useEffect, useState } from "react";
import "./media.css";
import { Avatar } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { TiHeartOutline } from "react-icons/ti";
import { MdOutlineGraphicEq } from "react-icons/md";
import { BiRepost } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoBookmark } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AddBookmarks, GetAllBookmarks } from "../Apicalls/post";

const Bookmark = () => {
  const [present, setpresent] = useState(true);
  const [posts, setposts] = useState();

  const user = useSelector((state) => state?.users?.user);
  // console.log("user media", user);
  const handleBookmark = async (id) => {
    const payload = {
      userId: user?._id,
      prodId: id,
    };
    try {
      const response = await AddBookmarks(payload);
      // console.log("response books", response);
      handleGetBookmarks(user._id)
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetBookmarks = async (userId) => {
    try {
      const response = await GetAllBookmarks(userId);
      setposts(response.data.Bookmarks);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if(user){
      handleGetBookmarks(user._id);
    }
  },[user]);

  
// console.log("posts loaded",posts)
  return (
    <div style={{height:"100vh", overflow:"scroll"}}>
      {posts?.map((item, index) => (
        <div className="Mediacontainer" key={index}>
          <div className="Mediauserdiv">
            <div className="usersinfo">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Avatar name="Dan Abrahmov" src={item?.User.ProfilePicture} />
                <div>
                  <h1>{item?.User.name}{" "}{item.createdAt}</h1>
                </div>
              </div>
              <div>
                <BsThreeDots size={24} />
              </div>
            </div>
          </div>

          <div className="mediaContain">
            <p>{item?.content}</p>
            {item?.videoUrl ? (
              <div className="media">
                <div className="mediavideodiv">
                  <video
                    src={item?.videoUrl}
                    className="video"
                    controls
                    poster={item?.imageUrl}
                  ></video>
                </div>
              </div>
            ) : (
              <div className="mediavideodiv">
                <img
                  className="mediaimg"
                  src={item?.imageUrl}
                  alt="picture_img"
                />
              </div>
            )}
            <div className="mediaBottom">
              <div className="mediaIcons">
                <div className="iconsHoverComment">
                  <AiOutlineComment size={24} />
                  {215}
                </div>
                <div className="iconsHoverreport">
                  <BiRepost size={24} />
                  {215}
                </div>
                <div className="iconsHoveroutline">
                  {present ? (
                    <AiFillHeart size={23} color="red" />
                  ) : (
                    <TiHeartOutline size={24} />
                  )}
                  {215}
                </div>
                <div className="iconsHovergraph">
                  <MdOutlineGraphicEq size={24} />
                  {"2.5M"}
                </div>
                <div className="iconsHoverbook">
                  {present ? (
                    <IoBookmark
                      size={23}
                      onClick={() => handleBookmark(item._id)}
                    />
                  ) : (
                    <CiBookmark
                      size={24}
                      onClick={() => handleBookmark(item._id)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Bookmark;
