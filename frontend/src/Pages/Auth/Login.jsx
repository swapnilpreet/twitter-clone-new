import React, { useEffect, useState } from "react";
import logo from "../../assects/x-login.png";
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import style from "../Styles/login.module.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LoginUser, LoginWithGoogleUser } from "../../Apicalls/user";
import { useToast } from '@chakra-ui/react'


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
  const toast = useToast()

  const handleSubmit = async(e) => {
    e.preventDefault();

    const payload ={
      email,password,
    }

    try {
       const response = await LoginUser(payload);
       if(response.success){
         localStorage.setItem('token', response.data);
         toast({
           title: 'Login Success',
           description: response.message,
           status: 'success',
           duration: 5000,
           isClosable: true,
          })
          window.location.href='/';
       }else{
        if(response.message === 3){
          toast({
            title: 'Error Occured',
            description: `Incorrect Password attempt ${response.message} Please Check your Email Address we send mail to you`,
            status: 'error',
            duration: 8000,
            isClosable: true,
          })
        }
        else if(response.message === 5){
          toast({
            title: 'Error Occured',
            description: `We are going to block your Account for a 1 hour becouse, Incorrect Password attempt ${response.message}`,
            status: 'error',
            duration: 8000,
            isClosable: true,
          })
        }else{
          toast({
            title: 'Error Occured',
            description: `Incorrect Password attempt ${response.message}`,
            status: 'error',
            duration: 5000,
            isClosable: true,
          })
        }
       }
    } catch (error){
      toast({
        title: 'Error Occured',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  };

  useEffect(() => {
    const addgoogleuser =async()=>{
      if(googleuser){
        const payload ={
          name:googleuser?.user.displayName,
          email:googleuser?.user.email,
          ProfilePicture:googleuser?.user.photoURL,
          password:googleuser?.user.uid
          ,
        }
        try {
           const response = await LoginWithGoogleUser(payload);
          //  console.log("LoginWithGoogleUser",response,response.success)
           if(response.success){
            localStorage.setItem('token', response.data);
            window.location.href='/';
            // navigate("/");
           }else{
            throw new Error("Couldn't login");
           }
        } catch (error) {
          console.log(error);
        }
      }
    }
    addgoogleuser();
  }, [googleuser])
  
  //  console.log("googleuser login",googleuser)
   const handleGoogle=async()=>{
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
              <FcGoogle size={23} />
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
            <form onSubmit={(e)=>handleSubmit(e)} className={style.form}>

              <label className={style.label}>Email</label>
              <input
                autoComplete='true'
                style={{ color: "white" }}
                type="email"
                placeholder="@enteremailhere"
                onChange={(e) => setemail(e.target.value)}
              />

              <label className={style.label}>Password</label>
              <input
                autoComplete='true'
                type="password"
                style={{ color: "white" }}
                placeholder="enter password here"
                onChange={(e) => setpassword(e.target.value)}
              />
              <button className={style.signupbtn}>SignIn</button>
            </form>
            </div>

            <div className={style.accbtn}>
              <h4>Don't have an account?</h4>
              <button
                className={style.signinbtn}
                onClick={() => navigate("/signup")}>
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
