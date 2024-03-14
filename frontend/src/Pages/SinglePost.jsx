import React from "react";
import { useNavigate } from "react-router-dom";

const SinglePost = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div style={{border:"1px solid red"}}>
      <h1>SinglePost</h1>
      <button onClick={handleBack}>Go back</button>
    </div>
  );
};

export default SinglePost;
