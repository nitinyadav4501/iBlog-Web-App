import React from 'react'
import { RiBloggerFill } from "react-icons/ri";

function Logo() {
  return (
    <div className="text-2xl flex items-center justify-center gap-x-1 font-bold ">
      <div>
        <RiBloggerFill />
      </div>
      <h1>iBlog</h1>
    </div>
  );
}

export default Logo
