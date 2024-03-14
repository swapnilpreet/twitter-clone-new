import React, { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { CiLocationOn } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { VscVerifiedFilled } from "react-icons/vsc";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { GetAllUsersPost } from "../Apicalls/post";
import moment from "moment";
import  './profile.css'
import { MdOutlineModeEdit } from "react-icons/md";

const Profile = () => {
  const user = useSelector((state) => state?.users?.user);
  const [userPosts, setuserPosts] = useState([])

  // console.log("userPosts", userPosts);
  
  const GetUsersPost =async()=>{
    try {
      const response = await GetAllUsersPost({userId:user?._id});
      if(response.success){
        setuserPosts(response.data);
      }else{
        throw new Error("Couldn't get users posts")
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  useEffect(() => {
    GetUsersPost();
  }, []);
  
  
  return (
    <div>
      <div className="flex gap-10 text-center items-center pl-5 mb-2">
        <div className="">
          <IoMdArrowRoundBack size={22} />
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-xs text-left">{userPosts?.length} posts</p>
        </div>
      </div>

      <div className="relative bg">
        <div className=" h-60 w-[100%] ">
          <img
            src="https://images.unsplash.com/photo-1690138871287-02b2fc3b87c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHR3aXR0ZXIlMjBYfGVufDB8fDB8fHww"
            alt="backgroundImg"
            className="h-[100%] w-[100%] object-cover"
          />
        </div>

{/* profile pics */}

        <div className="absolute top-[55%] left-7 h-40 rounded-full w-40">
          <div className="HoverDiv">
          <img
            src={user?.ProfilePicture}
            alt="profilepics"
            className="h-[100%] w-[100%] object-cover rounded-full p-1 bg-white"
          />
          <p className="EditIcon"><MdOutlineModeEdit size={30} color="black" onClick={()=>console.log('swapnil')}/></p>
          </div>
        </div>


        <div className="flex items-end justify-end pr-5">
          <button className=" mt-4 border border-solid border-gray-400 rounded-full p-1 pl-4 pr-3 font-semibold">
            Edit profile
          </button>
        </div>
      </div>

      <div className="mt-20 pl-8">
        <div className="flex items-center gap-3">
          <h1 className=" text-2xl font-semibold ">{user?.name}</h1>
         {user?.isVerified && <div className="flex text-center items-center gap-2">
            <VscVerifiedFilled color="#1d9bf0" size={20} />
            <p className="text-xs text-gray-500">{user?.typeOfUser}</p>
          </div>
        }
             
        </div>

        <p className="text-sm text-gray-500">
          @{user?.name.split(" ").join("")}
        </p>
        <p className="text-sm text-gray-500">
          {user?.email}
        </p>

        <div className="flex gap-10 mt-4 text-gray-500">
          <div className="flex text-center items-center gap-2">
            <CiLocationOn />
            <h1>Nagpur</h1>
          </div>

          <div className="flex text-center items-center gap-2">
            <SlCalender />
            <h1>{moment(user?.createdAt).format('MMM D , YYYY hh:mm A')}</h1>
          </div>
        </div>

        <div className="flex gap-8 mt-3 text-gray-500">
          <div className="flex gap-2">
            {user?.following.length} <h1>Following</h1>
          </div>

          <div className="flex gap-2">
          {user?.followers.length} <h1>Follower</h1>
          </div>

          <div className="flex gap-2">Subscription<span className="text-green-500">{user?.subscription}</span></div>
        </div>

      </div>

      {/* tabs */}
      <Tabs isFitted>
        <TabList>
          <Tab>Posts</Tab>
          <Tab isDisabled>Replies</Tab>
          <Tab>Highlights</Tab>
          <Tab>Media</Tab>
          <Tab>Likes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>Posts</TabPanel>
          <TabPanel>Replies</TabPanel>
          <TabPanel>Highlights</TabPanel>
          <TabPanel>Media</TabPanel>
          <TabPanel>Likes</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Profile;
