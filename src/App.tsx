import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./features/header/Header";


function App() {
  return (
    <div className="p-2 flex flex-col gap-2 h-screen w-screen dark:text-white dark:bg-slate-700 ">
    
      <Header />
      <div className={`border w-full`} />
      <Outlet />
    </div>
  );
}

export default App;
