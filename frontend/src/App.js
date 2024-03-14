import "./App.css";
import Home from "./Pages/Home";
import Sidebar from "./Pages/Sidebar";
import Widgets from "./Pages/Widgets";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";

import Explore from "./Pages/Explore";
import Feed from "./Pages/Feed";
import Notification from "./Pages/Notification";
import Bookmark from "./Pages/Bookmark";
import Message from "./Pages/Message";
import Grok from "./Pages/Grok";
import LIsts from "./Pages/LIsts";
import Communities from "./Pages/Communities";
import Premium from "./Pages/Premium";
import More from "./Pages/More";
import Profile from "./Pages/Profile";
import ProtectedPage from "./Pages/ProtectedPage";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import Loading from "./Pages/Loading";
import SinglePost from "./Pages/SinglePost";

function App() {
  return (
    <>
      <div className="bg-black">
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/loading" element={<Loading />} />
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home/>
              </ProtectedPage>
            }
          >
            <Route
              path=""
              element={
                <ProtectedPage>
                  {" "}
                  <Feed />
                </ProtectedPage>
              }
            />
             <Route
              path="single"
              element={
                <ProtectedPage>
                  {" "}
                  <SinglePost />
                </ProtectedPage>
              }
            />
            <Route
              path="explore"
              element={
                <ProtectedPage>
                  <Explore />
                </ProtectedPage>
              }
            />
            <Route
              path="notification"
              element={
                <ProtectedPage>
                  <Notification />
                </ProtectedPage>
              }
            />
            <Route
              path="message"
              element={
                <ProtectedPage>
                  <Message />
                </ProtectedPage>
              }
            />
            <Route
              path="grok"
              element={
                <ProtectedPage>
                  <Grok />
                </ProtectedPage>
              }
            />
            <Route
              path="lists"
              element={
                <ProtectedPage>
                  <LIsts />
                </ProtectedPage>
              }
            />
            <Route
              path="bookmark"
              element={
                <ProtectedPage>
                  <Bookmark />
                </ProtectedPage>
              }
            />
            <Route
              path="Communities"
              element={
                <ProtectedPage>
                  <Communities />
                </ProtectedPage>
              }
            />
            <Route
              path="premium"
              element={
                <ProtectedPage>
                  <Premium />
                </ProtectedPage>
              }
            />
            <Route
              path="more"
              element={
                <ProtectedPage>
                  <More />
                </ProtectedPage>
              }
            />
            <Route
              path="profile"
              element={
                <ProtectedPage>
                  <Profile />
                </ProtectedPage>
              }
            />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
