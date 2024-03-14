import React, { useState } from "react";
import { getpaymentOrder, getpaymentVerify } from "../Apicalls/payment";
import {useNavigate} from 'react-router-dom'
import { VerifyUserAccount } from "../Apicalls/user";
import {useSelector,useDispatch} from "react-redux";
import { Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { SetUser } from "./Redux/userSlice";
import VerifiedError from "../Componets/VerifiedError";
import icon from '../Componets/verified.png'

const More = () => {
  const navigate= useNavigate();
  const dispatch = useDispatch()

  const user = useSelector((state) => state?.users?.user);
  const [email, setemail] = useState("")
  const [userTypes, setuserTypes] = useState("")
  const toast = useToast()
  
// console.log("usersMOre",user)

  const handlePayment = async (price) => {
    const amount=Number(price);
    console.log(amount)
    const _data = { amount: amount,email:email,userId:user._id};
    try {
      const response = await getpaymentOrder(_data);
      if (response.success) {
        console.log("handlePayment",response);
        handleOpenRazorpay(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
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

  const handleOpenRazorpay = (data) => {
    const options = {
      key: "rzp_test_93GbPzDVgg9zAW",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Twitter.com",
      description: "security",
      image: "https://img.freepik.com/free-vector/gradient-monochrome-twitter-logo-template_52683-132640.jpg?t=st=1708097387~exp=1708097987~hmac=02cc4ff73a63946aab2f7ff7add6a3def46abef08172f6fad002008baa558c6b",
      handler: function (response) {
        const handlePaymentverify = async (response) => {
          const _data = { response: response };
          try {
            const response = await getpaymentVerify(_data);
            if(response.success) {
              console.log("handlePaymentverify",response);
              handleuserVerification(user._id);
              navigate('/');
            }else{
              throw new Error(response.message)
            }
           
          } catch (error) {
           console.log(error);
          }
        };
        handlePaymentverify(response);
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  const handleuserVerification=async()=>{
    try {
      const payload ={
        userId:user._id,
        usertype:userTypes,
      }
      const response = await VerifyUserAccount(payload);
      if(response.success){
        console.log("handleuserVerification",response.data)
        dispatch(SetUser(response.data))
        toast({
          title: 'Vefication Success',
          description: "Your Account Is Verified",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      }else{
        throw new Error("Something went Wrong in VerifyUserAccount")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  

  return (
    <>
    {user?.isVerified === true ? (<>
      <VerifiedError/>
    </>):(
    <div className="h-screen">
      <div className="m-auto text-center p-10">
      <img src={icon} alt="" className='h-10 m-auto'/>
        <h1 className="text-4xl font-bold">Premium Account Verification</h1>
        <p className="mt-4" >
        We introduce a premium verification system for public figures, celebrities, and influencers, etc. After your account is verified, you will receive a prestigious badge signifying your authenticity.
        </p>
        <p className="text-sm text-gray-500 mt-4">
The Premium Account Verification fee applicable for everyone is INR 4,990.</p>
        <input className="mt-5" type="email" placeholder="Enter your Email here" value={email} onChange={(e)=>setemail(e.target.value)}/>
        <input type="text" className="mt-5" placeholder="celebrities,Influencers,PMO,CMO,Govt.Auth,etc.." value={userTypes} onChange={(e)=>setuserTypes(e.target.value)}/>

        <Button className="mt-5" 
        borderRadius={"20px"}
        w="100%" colorScheme='blue' isDisabled={!email || !userTypes} size='md' onClick={()=>handlePayment(499)} >Apply & Pay</Button>
      </div>
    </div>
    )}
    </>
  );
};

export default More;
