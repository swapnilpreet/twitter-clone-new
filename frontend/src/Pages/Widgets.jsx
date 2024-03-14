import React, { useEffect, useState } from "react";
import "./widgets.css";
import { Button, InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { VscVerifiedFilled } from "react-icons/vsc";
import { LiaSearchSolid } from "react-icons/lia";
import { FollowUser, GetAllUser, GetCurrentUser } from "../Apicalls/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetUser } from "./Redux/userSlice";
const happing = [
  {
    id: 1,
    text: "Trending in India",
    h4: "#TwitterDown",
    P2: "Trending with",
    span: "#XDown",
  },
  {
    id: 2,
    text: "Business & finance · Trending",
    h4: "#sandeepmaheshwari",
    text2: "39.4K posts",
    span: "",
  },
  {
    id: 3,
    text: "Entertainment · Trending",
    h4: "#DunkiReview",
    text2: "Trending with ",
    span: "SRKs DISASTER DONKEY, #RajkumarHirani",
  },
  {
    id: 4,
    text: "Trending in India",
    h4: "#ArrestRheaChakraborty",
    text2: "13.9K posts",
    span: "#XDown",
  },
  {
    id: 5,
    text: "Trending in India",
    h4: "#Ponmudi",
    text2: "7,127 posts",
    span: "#XDown",
  },
];

const Widgets = () => {
  const user = useSelector((state) => state?.users?.user);
  const [displayUser, setdisplayUser] = useState([]);

  const dispatch = useDispatch();
 

    const VerifiedUser = async()=>{
      try {
        const response = await GetCurrentUser();
        if (response.success) {
          dispatch(SetUser(response.data));
        }
      } catch (error) {
         console.log(error);
      }
    }

  const handleUsers = async () => {
    try {
      const response = await GetAllUser();
      // console.log(response,"users");
      setdisplayUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  

  const handleFollow = async (followId) => {
    try {
      const payload = {
        userId: user._id,
        followId,
      };
      const response = await FollowUser(payload);
      if(response.success) {
        VerifiedUser()
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleUsers();
  }, []);

   

  return (
    <div className="hidden xl:inline xl:w-[350px] py-1 space-y-5 text-slate-100 relative ">
      <div className="widgetscontainer">
        <div className="pl-4">
          <div className="seachbox">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <LiaSearchSolid color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Search" borderRadius={"25px"} />
            </InputGroup>
          </div>

          <div className="Premiumdiv">
            <div style={{ textAlign: "left" }}>
              <h1>Subscribe to Premium</h1>
              <p>
                Subscribe to unlock new features and if eligible ,receive a
                share of ads revenue.
              </p>
              <Button
                colorScheme="blue"
                borderRadius={"50px"}
                marginTop={"10px"}
              >
                Subscribe
              </Button>
            </div>
          </div>

          <div className="happening">
            <div style={{ textAlign: "left", paddingTop: "10px" }}>
              <h1 style={{ paddingLeft: "15px" }}>What’s happening</h1>

              {happing?.map((item, index) => (
                <div key={index} className="happeningcontaint">
                  <div>
                    <p>{item.text}</p>
                    <h4>{item.h4}</h4>
                    <p>
                      {item.text2}
                      <span>{item.span}</span>
                    </p>
                  </div>
                  <div>
                    <BsThreeDots size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="follow">
            <h1 style={{ fontWeight: "700", paddingLeft: "15px" }}>
              Who to follow
            </h1>

            {displayUser?.map((item, index) => (
              <div className="pl-2 pr-2" key={index}>
                {user?._id !== item?._id ? (
                  <>
                    <div className=" h-14 flex gap-1 text-center p-1 w-[100%]">

                      <div className=" h-full w-[17%] rounded-full">
                        <img
                          src={item?.ProfilePicture}
                          alt="pic"
                          referrerPolicy="no-referrer"
                          className="rounded-full h-full w-full"
                        />
                      </div>

                      <div className="w-[55%] text-center">
                        <div
                          className="w-full flex justify-center items-center gap-1">
                          <h2 style={{ fontWeight: "600" }}>{item.name}</h2>
                          {item?.isVerified === true ? (
                            <VscVerifiedFilled color="#1d9bf0" />
                          ) : null}
                        </div>
                        <p style={{ fontSize: "12px" }}>
                          @{item.name.split(" ").join("")}
                        </p>
                      </div>

                      <div className="w-[30%] flex items-center justify-end">
                               {user?.following.includes(item?._id) ? (
                            <>
                              <Button borderRadius={"full"} size={"sm"} onClick={() => handleFollow(item?._id)}>
                                    Unfollow
                                  </Button>
                            </>
                          ) : (
                            <Button borderRadius={"full"} size={"sm"} onClick={() => handleFollow(item?._id)}>
                                  follow
                                  </Button>
                          )}
                      </div>

                    </div>
                  </>
                ) : null}
              </div>
            ))}
          </div>

          <div>
            <p style={{ paddingLeft: "20px", fontSize: "10px" }}>
              Terms of Service Privacy Policy Cookie Policy Accessibility Ads
              info More © 2023 X Corp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widgets;
