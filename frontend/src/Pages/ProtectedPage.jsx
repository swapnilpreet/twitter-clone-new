import { useEffect} from "react";
import { useToast } from '@chakra-ui/react'
import { GetCurrentUser} from "../Apicalls/user";
import { SetUser } from "./Redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
 

    const VerifiedUser = async()=>{
      try {
        const response = await GetCurrentUser();
        if (response.success) {
          // console.log(response)
          dispatch(SetUser(response.data));
        } else {
          toast({
            title: "Error occurred In protected page",
            description: response.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Error occurred In protected page",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      }
    }
  
    useEffect(() => {
      if(localStorage.getItem('token')){
         VerifiedUser();
      }else{
        navigate("/login");
      }
    },[]);

    return children;
};

export default ProtectedPage;
