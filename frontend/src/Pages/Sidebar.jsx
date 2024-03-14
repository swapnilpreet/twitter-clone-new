import React from "react";
import SidebarLink from "../Componets/SidebarLink";
import { FaHome } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { CiInboxIn } from "react-icons/ci";
import { CiViewList } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { PiUsersThreeBold } from "react-icons/pi";
import { BsTwitterX } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import { CiCircleMore } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Portal,
  Button,
} from "@chakra-ui/react";
import { useSignOut } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useSelector,useDispatch } from "react-redux";
import { LogoutUser } from "./Redux/userSlice";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [signOut] = useSignOut(auth);
  const dispatch = useDispatch()
  const navigate= useNavigate()
  const user = useSelector((state) => state?.users?.user);
  const toast = useToast();

  const handleSignout=()=>{
    dispatch(LogoutUser());
  }
  
  return (
    <>
      <div className="hidden sm:flex flex-col items-center xl:items-start xl:w-[440px] p-2 fixed h-full 
      
      ">

        <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0 xl:ml-48">
          <img src="https://rb.gy/ogau5a" width={30} height={30} alt="swa" />
        </div>

        <div className="space-y-3 mb-3 xl:ml-48">
          <Link to={"/"}>
            <SidebarLink text="Home" Icon={FaHome} active />
          </Link>

          <Link to={"/explore"}>
            <SidebarLink text="Explore" Icon={IoSearchOutline} />
          </Link>

          <Link to={"/notification"}>
            <SidebarLink text="Notifications" Icon={FaRegBell} />
          </Link>

          <Link to={"/message"}>
            <SidebarLink text="Messages" Icon={SlEnvolopeLetter} />
          </Link>

          <Link to={"/grok"}>
            <SidebarLink text="Grok" Icon={CiInboxIn} />
          </Link>

          <Link to={"/lists"}>
            <SidebarLink text="Lists" Icon={CiViewList} />
          </Link>

          <Link to={"/bookmark"}>
            <SidebarLink text="Bookmarks" Icon={CiBookmark} />
          </Link>

          <Link to={"/Communities"}>
            <SidebarLink text="Communities" Icon={PiUsersThreeBold} />
          </Link>

          <Link to={"/premium"}>
            <SidebarLink text="Premium" Icon={BsTwitterX} />
          </Link>

          <Link to={"/profile"}>
            <SidebarLink text="Profile" Icon={CiUser} />
          </Link>

          <Link to={"/more"}>
            <SidebarLink text="Verification" Icon={CiCircleMore} />
          </Link>

        </div>

        <button className="hidden xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
          Tweet
        </button>

        {user && (
          <Popover>
            <PopoverTrigger>
              <div className="xl:w-[50%] border rounded-full flex text-center items-center xl:pl-2 xl:pr-2  mt-auto hoverAnimation xl:ml-auto p-1 hover:bg-slate-700">
                   <div className="xl:w-[35%]">
                      <img src={user?.ProfilePicture}
                        alt="userpicture"
                        referrerPolicy="no-referrer"
                        className="h-12 w-12 rounded-full xl:mr-2.5"/>
                   </div>

                   <div className="hidden xl:inline leading-5 w-[100%]   ">
                      <h4 className="text-white">{user?.name}</h4>
                      <p className="text-[#6e767d]">@{user?.name.split(" ").join("")}</p>
                   </div>

                   <div className="w-[10%]">
                      <BsThreeDotsVertical color="white" className="h-5 hidden xl:inline ml-1"/>
                   </div>
              </div>

            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Button
                    w={"100%"}
                    bg={"black"}
                    color={"white"}
                    onClick={async () => {
                      handleSignout();
                      const success = await signOut();
                      if (success) {
                        localStorage.removeItem('token')
                        toast({
                          title: 'Logout Success',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                         })
                         navigate('/login')
                      }
                    }}
                  >
                    Log out{" "}
                    <span style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      {user?.email}
                    </span>
                  </Button>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </div>

      <div className="inline sm:hidden border border-t border-gray-500 absolute z-50 bg-black bottom-0  flex w-[100%] justify-evenly p-2">
        <Link to={"/"}>
          <FaHome color="white" size={30} />
        </Link>

        <Link to={"/more"}>
          <CiCircleMore color="white" size={30} />
        </Link>

        <Link to={"/premium"}>
          <BsTwitterX color="white" size={30} />
        </Link>

        {/* <Link to={"/message"}>
          <SlEnvolopeLetter color="white" size={40} />
        </Link> */}

        {user && (
          <Popover>
            <PopoverTrigger>
              <div className="xl:w-[50%] border rounded-full flex text-center items-center xl:pl-2 xl:pr-2  mt-auto hoverAnimation xl:ml-auto p-1 hover:bg-slate-700">
                   <div className="xl:w-[35%]">
                      <img src={user?.ProfilePicture}
                        alt="userpicture"
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full xl:mr-2.5"/>
                   </div>

                   <div className="hidden xl:inline leading-5 w-[100%]">
                      <h4 className="text-white">{user?.name}</h4>
                      <p className="text-[#6e767d]">@{user?.name.split(" ").join("")}</p>
                   </div>

                   <div className="w-[10%]">
                      <BsThreeDotsVertical color="white" className="h-5 hidden xl:inline ml-1"/>
                   </div>
              </div>

            </PopoverTrigger>
            <Portal>
              <PopoverContent>
                <PopoverArrow />
                <PopoverHeader>Header</PopoverHeader>
                <PopoverCloseButton />
                <PopoverBody>
                  <Button
                    w={"100%"}
                    bg={"black"}
                    color={"white"}
                    onClick={async () => {
                      handleSignout();
                      const success = await signOut();
                      if (success) {
                        localStorage.removeItem('token')
                        toast({
                          title: 'Logout Success',
                          status: 'success',
                          duration: 5000,
                          isClosable: true,
                         })
                         navigate('/login')
                      }
                    }}
                  >
                    Log out{" "}
                    <span style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      {user?.email}
                    </span>
                  </Button>
                </PopoverBody>
                <PopoverFooter>This is the footer</PopoverFooter>
              </PopoverContent>
            </Portal>
          </Popover>
        )}
      </div>
    </>
  );
};

// home, notification,seach,message,

export default Sidebar;
