import React from 'react'
import { PiChecksBold, PiCurrencyInrBold } from "react-icons/pi";
import { MdLockOutline } from "react-icons/md";
import { getSubscribepaymentOrder, getSubscribepaymentVerify} from '../Apicalls/payment';
import {Button} from '@chakra-ui/react';
import { UserSubscription } from '../Apicalls/user';
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from 'react-router-dom'
import { SetUser } from '../Pages/Redux/userSlice';
import { useToast } from '@chakra-ui/react'
// import { PiCurrencyInrBold } from "react-icons/pi";

const PremiumCard = ({displayprice,disabled,postperDays,rupee,plan,title,zero,frist,two,three,four,five,six,seven,eight,nine,ten,eleven,tweaeel,thirteen,fourteen, fifteen}) => {
  const navigate= useNavigate();
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.users?.user);
  const toast = useToast()

  const handlePayment = async (price,type) => {
    const amount=Number(price);
    console.log("amount",amount,type)
    const _data = { amount: amount};
    try {
      const response = await getSubscribepaymentOrder(_data);
      if (response.success) {
        console.log("handlePayment",response);
        handleOpenRazorpay(response.data,type);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.log(error.message);
      // toast({
      //   title: 'Order Creating Error',
      //   description: error.message,
      //   status: 'error',
      //   duration: 5000,
      //   isClosable: true,
      // })
    }
  };

  const handleOpenRazorpay = (data,type) => {
    console.log("type_screen", type);
    var types = type;
    const options = {
      key: "rzp_test_93GbPzDVgg9zAW",
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      name: "Twitter-Clone-com",
      description: "security",
      image: "https://img.freepik.com/free-vector/gradient-monochrome-twitter-logo-template_23-2150728924.jpg?w=826&t=st=1708095087~exp=1708095687~hmac=6934c5c84da65b3d5d9812e6f7a8fb2ee5ae39c2921583e875ba486456124ae8",
      handler: function (response) {
        const handlePaymentverify = async (response) => {
          const _data = { response: response };
          try {
            const response = await getSubscribepaymentVerify(_data);
            if(response.success) {
              console.log("handlePaymentverify",response);
              handleuserVerification(types);
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
  
  const handleuserVerification=async(type)=>{
    try {
      console.log("Verification",type);
      const payload ={
        userId:user._id,
        subscriptionToAdd:type,
      }
      const response = await UserSubscription(payload);
      if(response.success){
        console.log("handleuserVerification",response.data)
        dispatch(SetUser(response.data))
        toast({
          title: 'Subscription Success',
          description: "Your Account Is Subscribe",
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
    <div className='w-[90%] mt-2 m-auto'>
    <div className='border border-solid text-center p-4'>
     <h1 className='text-2xl'>{title} Plan</h1>
     <div className='text-left'>
       <h3>Enhanced Experience</h3>
        <div>

         <div className='flex justify-between pt-1'>
            <p className={`text-xs ${frist === true ? 'text-gray-500' : ''}`}>Add {postperDays} post/day</p>
            {frist === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${zero === true ? 'text-gray-500' : ''}`}>Edit/Delete posts</p>
          {zero === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${two === true ? 'text-gray-500' : ''}`}>Undo post</p>
          {two === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${three === true ? 'text-gray-500' : ''}`}>Post longer video</p>
          {three === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${four === true ? 'text-gray-500' : ''}`}>Top Articles</p>
          {four === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${five === true ? 'text-gray-500' : ''}`}>Reader</p>
          {five === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${six === true ? 'text-gray-500' : ''}`}>Backgrond video playback</p>
          {six === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${seven === true ? 'text-gray-500' : ''}`}>Download video</p>
          {seven === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${eight === true ? 'text-gray-500' : ''}`}>Small reply boost</p>
          {eight === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${nine === true ? 'text-gray-500' : ''}`}>No Ads For you and Following</p>
          {nine === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${ten === true ? 'text-gray-500' : ''}`}>Largest reply boost</p>
          {ten === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

        </div>
     </div>

     <div>
       <h3>Creator Hub</h3>
        <div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${eleven === true ? 'text-gray-500' : ''}`}>get paid to post</p>
          {eleven === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${tweaeel === true ? 'text-gray-500' : ''}`}>Creator Subscriptions</p>
          {tweaeel === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${thirteen === true ? 'text-gray-500' : ''}`}>X Pro (web only)</p>
          {thirteen === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${fourteen === true ? 'text-gray-500' : ''}`}>Media studio (web only)</p>
          {fourteen === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className={`text-xs ${fifteen === true ? 'text-gray-500' : ''}`}>Analytics (web only)</p>
          {fifteen === true ? <MdLockOutline color='gray'/> : <PiChecksBold color='green'/>} 
         </div>

         <div className='flex justify-between pt-1'>
           <p className='text-xs flex'><PiCurrencyInrBold/>{displayprice}/month</p>
           <PiCurrencyInrBold color='green'/>
         </div>


        </div>
     </div>

     <div className='mt-5'>
     { plan ? <button className='bg-green-500 p-2  rounded-lg'>Subscribed</button> :
      <Button isDisabled={disabled} onClick={()=>handlePayment(rupee,title)}  >Subscribe</Button>}
     </div>

    </div>
  </div>
  )
}

export default PremiumCard