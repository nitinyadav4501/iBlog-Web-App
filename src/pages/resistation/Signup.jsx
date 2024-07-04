import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../../context/MyContext";
import Loader from "../../components/loader/Loader";

function Signup() {
  const {
    signup,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    passwordLengthError,
  } = useMyContext();

  const handleSubmit = (e) => {
    e.preventDefault();
      signup();
  };
  return (
    <div className="bg-gray-300 text-gray-300 h-screen w-full flex justify-center items-center">
      {loading && <Loader />}
      <form
        onSubmit={handleSubmit}
        className="bg-[#82908F] rounded-xl p-8 space-y-4"
      >
        <h1 className="text-center font-bold text-2xl mb-4">Signup</h1>
        <div className="flex flex-col justify-center w-72">
          <input
            type="text"
            id="name"
            className="px-3 outline-none py-2 rounded-md bg-[#627473] border border-[#CED4D3]"
            placeholder="Enter Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center w-72">
          <input
            type="email"
            id="email"
            className="px-3 outline-none py-2 rounded-md bg-[#627473] border border-[#CED4D3]"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center w-72">
          <input
            type="password"
            id="password"
            className="px-3 outline-none py-2 rounded-md bg-[#627473] border border-[#CED4D3]"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-red-700">
            {handleSubmit?passwordLengthError:""}
          </div>
        </div>
        <div className="text-red-700">{!handleSubmit ? error : ""}</div>
        <button
          type="submit"
          className="w-full bg-gray-300 text-center border border-[#CED4D3] text-[#627473] py-2 rounded-md font-bold"
        >
          Signup
        </button>
        <p className="space-x-1">
          <span>If you have an account</span>
          <Link to={"/login"} className="text-white font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
