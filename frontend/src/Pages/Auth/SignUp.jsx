import React, { useEffect, useState } from "react";
import logo from "../../assects/x-login.png";
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import style from "../Styles/signup.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import { SignupUser, SignupgoogleUser } from "../../Apicalls/user";
import { useToast } from '@chakra-ui/react'

const SignUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [DOB, setDOB] = useState("");
  const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload={
      email,password,name
    }
    try {
        const response = await SignupUser(payload);
        console.log(response)
        if(response.success) {
          toast({
            title: 'Signup Success',
            description: response.message,
            status: 'success',
            duration: 5000,
            isClosable: true,
           })
          navigate('/login');
        }else{
          // console.log('Error', response.message)
          // throw new Error(response.message);
          toast({
            title: 'Signup Failed',
            description: response.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
           })
        }
    } catch (error) {
      console.log("error", error)
      toast({
        title: 'Signup Failed',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
       })
    }
  };

  if ( googleuser) {
    console.log("googleuser SIgnup",googleuser)
  }
  // if (  googleloading) {
  //   console.log("Loading........................");
  //   console.log("googleloading Loading........................");
  // }
  // if ( googleerror) {
  //   console.log("googleerror", googleerror.message);
  // }

  useEffect(() => {
    const addgoogleuser =async()=>{
      if(googleuser){
        const payload ={
          name:googleuser?.user.displayName,
          email:googleuser?.user.email,
          ProfilePicture:googleuser?.user.photoURL,
          password:googleuser?.user.uid,
        }
        try {
           const response = await SignupgoogleUser(payload);
           console.log("signupWithGoogleUser",response,response.success)
           if(response.success){
            toast({
              title: 'Login Success',
              description: response.message,
              status: 'success',
              duration: 5000,
              isClosable: true,
             })
            navigate("/login")
           }else{
            throw new Error(response.message);
           }
        } catch (error) {
          console.log(error);
          toast({
            title: 'Signup Failed',
            description: error.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
           })
        }
      }
    }
    addgoogleuser();
  }, [googleuser])
  
  
   
  

  const handleGoogle=()=>{
    signInWithGoogle();
   }

 
  return (
    <div className={style.logincontainer}>
      <div className={style.imgcontainer}>
        <div className={style.imginner}>
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className={style.formcontainer}>
        <div className={style.Innerformlogo}>
          <img src={logo} alt="" />
        </div>

        <div className={style.Innerform}>
          <h1>Happening now</h1>
          <h2>Join today.</h2>
          <div className={style.Innerformbtn}>
            <button className={style.googlebtn} onClick={handleGoogle}>
              <FcGoogle size={23}  />
              Sign in with Google
            </button>
            <br />
            <button className={style.googlebtn} style={{ color: "black" }}>
              <FaApple size={23} color="black" />
              Sign up with Apple
            </button>
            <br />
            <hr />
            <div>
              <button className={style.signupbtn} onClick={onOpen}>
                Create Acoount
              </button>
              <p className={style.pbtn}>
                By signing up, you agree to the <span>Terms of Service</span>{" "}
                and <span>Privacy Policy</span>, including{" "}
                <span>Cookie Use.</span>
              </p>
            </div>
            <div className={style.accbtn}>
              <h4>Already have an account?</h4>
              <button className={style.signinbtn} onClick={()=>navigate('/login')}>SignIn</button>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}  isCentered  >
        <ModalOverlay/>
        <ModalContent bg="black" border="1px solid white">
          <ModalHeader color={'white'}>Create your account</ModalHeader>
          <ModalCloseButton  color={'white'}/>
          <ModalBody>
            <form onSubmit={handleSubmit}>

              <label>Name</label>
              <input
                type="text"
                style={{color: 'white'}}
                placeholder="enter your name"
                onChange={(e) => setname(e.target.value)}
              />

              <label>Date of Birth</label>
              <input
                style={{color: 'white'}}
                type="date"
                onChange={(e) => setDOB(e.target.value)}
              />

              <label>Email</label>
              <input
                style={{color: 'white'}}
                type="email"
                placeholder="enter email here"
                onChange={(e) => setemail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                style={{color: 'white'}}
                placeholder="enter password here"
                onChange={(e) => setpassword(e.target.value)}
              />
              <button className={style.signupbtn}>SignUp</button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignUp;
