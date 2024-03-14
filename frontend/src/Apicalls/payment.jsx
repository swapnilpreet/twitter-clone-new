import axios from 'axios';

export const getpaymentOrder = async (amount)=>{
  try {
      const response = await axios.post('/api/payment/order',amount);
      return response.data;
  } catch (error) {
      return error.message;
  }
}

export const getpaymentVerify = async (payload)=>{
  try {
      const response = await axios.post('/api/payment/verify',payload);
      return response.data;
  } catch (error) {
      return error.message;
  }
}


export const getSubscribepaymentOrder = async (amount)=>{
  try {
      const response = await axios.post('/api/payment/subcribe/order',amount);
      return response.data;
  } catch (error) {
      return error.message;
  }
}

export const getSubscribepaymentVerify = async (payload)=>{
  try {
      const response = await axios.post('/api/payment/subcribe/verify',payload);
      return response.data;
  } catch (error) {
      return error.message;
  }
}

