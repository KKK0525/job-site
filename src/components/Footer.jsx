import { Link, useLocation } from "react-router-dom";
import logo from "assets/images/logo.svg";
import LinkedIn from "assets/LinkedIn.png";
import instagram from "assets/Instagram.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog } from "@fortawesome/free-solid-svg-icons";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { GiPositionMarker } from "react-icons/gi";

export default function Footer() {
  const linkUrl = useLocation();
  return (
    <div className="bg-white text-left">
      {!linkUrl.pathname.startsWith("/blog") && (
        <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-start">
          <div className="w-full md:w-2/5 lg:w-1/4 pr-6 flex flex-col space-y-3 pb-6 cursor-default">
            <Link className="flex pt-1" to="/">
              <img className="h-12 pb-2" src={logo} alt="logo" />
            </Link>
            <p className="text-lg text-green-700 font-medium -mt-2">Trusted Connections</p>
            <p className="flex items-center gap-2 text-gray-600">
              <GiPositionMarker className="my-1.5" />
              Jamshedpur, India
            </p>
            <p className="flex items-center gap-2 text-gray-600">
              <FaPhone className="my-1.5" />
              (+91) 9263805782
            </p>
            <a
              className="flex items-center gap-2 w-[220px] text-lg font-medium border-b-2 border-black hover:opacity-60"
              href="mailto:hr@minervatc.in"
            >
              <MdEmail className="my-1.5 text-gray-600" />
              hr@minervatc.in
            </a>
            <span className="font-light">
              Copyright © 2024 <span className="font-normal">@Minerva</span>
            </span>
          </div>

          <div className="w-full md:w-1/5 lg:w-1/4 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Welcome</h1>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/for-applicant">
              How it works
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/jobs">
              Find jobs
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/companies">
              Find companies
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/sign-in">
              Sign in
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/sign-up/new-applicant">
              Sign up
            </Link>
          </div>

          <div className="w-full md:w-1/5 lg:w-1/4 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Companies</h1>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/for-recruiter">
              How it works
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/create-new-job">
              Create job
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/sign-in">
              Sign in
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/sign-up/new-recruiter">
              Sign up
            </Link>
          </div>

          <div className="w-full md:w-1/5 lg:w-1/4 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Minerva</h1>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" to="/about">
              About us
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg"  to="/privacy-policy">
              Privacy policy
            </Link>
            <Link className="opacity-60 hover:text-blue-800 font-semibold text-lg" >
              Cookie policy
            </Link>
          </div>

          <div className="w-full md:w-1/5 lg:w-1/4 flex flex-col space-y-2 pb-6">
            <h1 className="text-2xl font-semibold">Follow us</h1>
            <div className="flex gap-4 pt-4">
              <a href="https://www.instagram.com/kha_martin/" target="_blank" rel="noreferrer">
                <img src={instagram} alt="Instagram logo" className="w-12 h-12" />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                <img src={LinkedIn} alt="LinkedIn logo" className="w-12 h-12" />
              </a>
            </div>
          </div>
        </div>
      )}

      {linkUrl.pathname.startsWith("/blog") && (
        <div className="w-10/12 mx-auto pt-20 pb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 justify-start">
          <div className="w-full md:w-2/5 lg:w-1/4 pr-6 flex flex-col space-y-3 pb-6 cursor-default">
            <Link className="flex pt-1" to="/">
              <img className="h-12 pb-2" src={logo} alt="logo" />
              <h1 className="md:pl-2 pl-2 text-4xl text-black font-medium hover:opacity-60">
                Minerva
              </h1>
              <FontAwesomeIcon icon={faBlog} />
            </Link>
            <div className="w-full md:w-2/4 lg:w-1/3 h-16 flex items-center justify-center md:justify-start ">
              <input
                placeholder="Email Address"
                className="p-4 rounded outline-none bg-gray-50 focus:bg-white transition duration-200"
              />
            </div>
            <button className="mt-4 text-center hover:bg-yellow-400 transition duration-200 font-bold text-md px-8 py-3 bg-yellow-300 rounded-xl text-black">
              Send mail
            </button>
            <span className="break-all w-3/4">
              By providing your email address, you agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong> of Minerva regarding your privacy information.
            </span>
            <div className="flex gap-4 pt-4">
              {/* Social Icons */}
              <a className="w-10 h-10" href="https://facebook.com" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
