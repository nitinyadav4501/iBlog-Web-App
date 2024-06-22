import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../logo/Logo";
function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const logout = () => {
    const confirmUser = confirm("Do you want to logout from iBlog ?");
    console.log(confirmUser);
    if (confirmUser) {
      localStorage.clear();
      window.location.href = "/";
    }
  };
  return (
    <div className="flex justify-between px-3 md:justify-around items-center py-3 bg-[#627473] text-[#CED4D3] drop-shadow-md shadow-sm">
      <Logo />
      <div className="md:space-x-10 space-x-5">
        {user ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "text-gray-300"
            }
            to={"/"}
          >
            Home
          </NavLink>
        ) : (
          ""
        )}
        {user ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "text-gray-300"
            }
            to={"/my-blogs"}
          >
            My Blogs
          </NavLink>
        ) : (
          ""
        )}
        {user ? (
          <NavLink to={"/"} onClick={logout}>
            Logout
          </NavLink>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
        {user ? (
          <NavLink
            className={({ isActive }) =>
              isActive ? "font-bold underline" : "text-gray-300"
            }
            to={"/about"}
          >
            About
          </NavLink>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Navbar;
