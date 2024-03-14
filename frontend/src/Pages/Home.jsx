import React from "react";
import {Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";


const Home = () => {
  return (
    <main className="bg-black flex max-w-[1500px] mx-auto">
      <Sidebar/>
      <div className="flex-grow border-l border-r max-w-xl sm:ml-[73px] xl:ml-[450px] text-white border-gray-400 h-screen overflow-scroll">
        <Outlet/>
      </div>
      <Widgets/>
    </main>
  );
};

export default Home;
