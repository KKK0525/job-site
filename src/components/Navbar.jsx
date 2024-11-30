import React from "react";
import { Disclosure } from "@headlessui/react";
import logo from "assets/images/logo.svg";
import HowIt from "./HowIt";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import ProfileMenu from "./ProfileMenu";
import { userType } from "libs/isAuth";
import isAuth from "libs/isAuth";
import { TbLogin2 } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";
import { Button } from "@mui/material";

export default function Navbar() {
  const linkUrl = useLocation();
  // console.log(linkUrl);

  return (
    <Disclosure as="nav" className="bg-white fixed z-50 top-0 left-0 w-full px-4 md:px-10 backdrop-blur-sm  shadow">
      <div className="flex justify-between h-24 py-6  w-full mx-auto"> 
        {/* Logo and Navigation Links */}
        <div className="flex items-center">
          <Link className="flex pt-1" to="/">
            <img className="md:pl-5 pl-2" src={logo} alt="logo" />
          </Link>

          <div className="hidden lg:flex items-center space-x-6 pl-8">
            <HowIt />
            <Link
              className="text-[#333333] text-lg font-semibold hover:text-[#0c4eb1]"
              to="/jobs"
            >
              Jobs
            </Link>
            <Link
              className="text-[#333333] text-lg font-semibold hover:text-[#0c4eb1]"
              to="/companies"
            >
              Companies
            </Link>
            <Link
              className="text-[#333333] text-lg font-semibold hover:text-[#0c4eb1]"
              to="/leaderboard"
            >
              Leaderboard
            </Link>
            {isAuth() && (
              <>
                {userType() === "applicant" && (
                  <Link
                    className="text-[#333333] text-lg font-semibold hover:text-[#0c4eb1]"
                    to="/resume-service"
                  >
                    Resume Service
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
        {/* Mobile Menu and User Actions */}
        <div className="flex items-center space-x-5">
          {!linkUrl.pathname.startsWith("/blog") && (
            <>
              <MobileMenu />
              {isAuth() ? (
                <>
                  <ProfileMenu type={userType} />
                </>
              ) : (
                <div className="flex items-center space-x-5 gap-3 mr-5">
                  <Link
                    className="hidden lg:block text-black text-3xl font-semibold hover:text-[#0c4eb1]"
                    to="/sign-in"
                  >
                    <TbLogin2 />
                  </Link>
                  <Link
                    className="hidden lg:block text-black text-3xl font-semibold hover:text-[#0c4eb1]"
                    to="/sign-up"
                  >
                    <RiUserAddLine />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Disclosure>

  );
}
