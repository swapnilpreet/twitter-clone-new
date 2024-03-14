import React, { useEffect, useState } from "react";
import "./media.css";
import { Avatar } from "@chakra-ui/react";
import { AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { TiHeartOutline } from "react-icons/ti";
import { MdOutlineGraphicEq } from "react-icons/md";
import { BiChat, BiLike, BiRepost, BiShare } from "react-icons/bi";
import { CiBookmark } from "react-icons/ci";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { IoBookmark } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AddBookmarks, AddNewComment, GetPostByID } from "../Apicalls/post";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  Card,
  Input,
  CardBody,
  Text,
  Flex,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";


const Media = ({ posts }) => {
  const [videois, setvideois] = useState(true);
  const [imagesid, setimagesid] = useState(true);
  const [present, setpresent] = useState(true);
  const [popcontent, setpopcontent] = useState("");
  const [comment, setcomment] = useState("")
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.users?.user);

  const handleBookmark = async (id) => {
    const payload = {
      userId: user?._id,
      prodId: id,
    };
    try {
      const response = await AddBookmarks(payload);
      console.log("response books", response);
    } catch (error) {
      console.log(error);
    }
  };

  const getSinglePost = async (id) => {
    try {
      const response = await GetPostByID(id);
      if (response) {
        setpopcontent(response.data);
      } else {
        throw new Error("Couldn't find post by Id");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  const handlereply = async(userId,postId)=>{
    try {
        const response = await AddNewComment({userId,
          postId,
          comment});
          console.log("comment respo",response)
    } catch (error) {
       console.log(error)
    }
  }

  return (
    <div className="h-auto">
      {posts?.map((item, index) => (
        <div className="Mediacontainer" key={index}>
          <div className="Mediauserdiv">
            <div className="usersinfo">
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Avatar name="Dan Abrahmov" src={item?.User?.ProfilePicture} referrerPolicy="no-referrer"/>
                <div>
                  <h1>{item?.User?.name}</h1>
                </div>
              </div>
              <div>
                <BsThreeDots size={24} />
              </div>
            </div>
          </div>

          <div className="mediaContain">
            <div onClick={() => navigate("/single")}>
              <p>{item?.content}</p>
              {item?.videoUrl &&
                <div className="media">
                  <div className="mediavideodiv">
                    <video
                      src={item?.videoUrl}
                      className="video"
                      controls
                      poster={item?.imageUrl}
                    ></video>
                  </div>
                </div>}
                
               {item?.imageUrl &&
                <div className="mediavideodiv">
                  <img
                    className="mediaimg"
                    src={item?.imageUrl}
                    alt="picture_img"
                  />
                </div>
               }
            
            </div>

            <div className="mediaBottom">
              <div className="mediaIcons">
                <div className="iconsHoverComment">
                  <div
                    onClick={() => {
                      onOpen();
                      getSinglePost(item._id);
                    }}
                  >
                    <AiOutlineComment size={24} />
                    {215}
                  </div>
                  {popcontent && (
                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      colorScheme="blackAlpha"
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Add Commenting</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Card maxW="md">
                            <CardBody>
                              <Flex spacing="4">
                                <Flex
                                  flex="1"
                                  gap="4"
                                  alignItems="center"
                                  flexWrap="wrap"
                                >
                                  <Avatar
                                    name="Segun Adebayo"
                                    src={popcontent?.User.ProfilePicture}
                                  />

                                  <Box>
                                    <Heading size="sm">
                                      {popcontent?.User.name}
                                    </Heading>
                                    <Text>
                                      @
                                      {popcontent?.User?.name
                                        .split(" ")
                                        .join("")}
                                    </Text>
                                  </Box>
                                </Flex>
                              </Flex>
                              <Box
                                borderLeft={"2px solid gray"}
                                margin={"auto"}
                                pl={"20px"}
                                w={"88%"}
                              >
                                <Text>{popcontent?.content}</Text>
                              </Box>

                              <Flex spacing="4">
                                <Flex flex="1" gap="1" alignItems="center">
                                  <Avatar
                                    name="Segun Adebayo"
                                    src={user?.ProfilePicture}
                                  />

                                  <Box border={"1px solid red"} w={"100%"}>
                                    <textarea
                                      placeholder="Type your Comment here"
                                      style={{ width: "100%" }}
                                      value={comment}
                                      onChange={(e)=>setcomment(e.target.value)}
                                    ></textarea>
                                  </Box>
                                </Flex>
                              </Flex>
                            </CardBody>
                          </Card>
                        </ModalBody>
                        <ModalFooter>
                                <Button
                                  //  isDisabled={true}
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={()=>handlereply(user._id,popcontent._id)}
                                  rounded={'full'}
                                >
                                  Reply
                                </Button>
                              </ModalFooter>
                      </ModalContent>
                    </Modal>
                  )}
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

export default Media;
