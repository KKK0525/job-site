import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "components/InputField";
import { SetPopupContext } from "App";
import axios from "axios";
import isAuth from "libs/isAuth";
import apiList from "../../../libs/apiList";
import { userType } from "libs/isAuth";
import { FcGoogle } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { Box, Modal, Button, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import GoogleLoginButton from "./googleLoginButton";

export default function SignIn({ setAuth }) {
  const setPopup = useContext(SetPopupContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [loggedin, setLoggedin] = useState(isAuth());
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [selectedOption, setSelectedOption] = useState("applicant");
  const [isgoogleModalOpen, setGoogleModalOpen] = useState(false);
  const opengoogleModal = () => setGoogleModalOpen(true);
  const closegoogleModal = () => setGoogleModalOpen(false);

  let allFieldsChecked =
    loginDetails.email.length > 0 && loginDetails.password.length > 0;

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const typicalLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("id", response.data._id);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            icon: "success",
            message: "Logged in successfully",
          });
          // console.log(response);
          setAuth(true);
          navigate(`/`);
        })
        .catch((err) => {
          setPopup({
            open: true,
            icon: "warn",
            message: err.response.data.message,
          });
          // console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (allFieldsChecked) {
      typicalLogin();
    } else {
      setPopup({
        open: true,
        icon: "warn",
        message: "Please fill in all required fields",
      });
    }
  };

  const type = userType();
  let history = useNavigate();

  useEffect(() => {
    if (type === "applicant") {
      history("/referrals");
    } else if (type === "recruiter") {
      history("/admin");
    } else if (type === "admin") {
      history("/dashboard/*");
    }
  }, [type, history]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("type", user.type);
      localStorage.setItem("id", user._id);

      closegoogleModal();
      setAuth(true);
      history("/");
      setPopup({
        open: true,
        icon: "warn",
        message: "Please setting your Profile!",
      });
    }
  });

  return (

    <form onSubmit={handleSubmit} className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg w-full max-w-md md:max-w-lg mx-4">
        {/* Sign-in Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
          Sign in
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm md:text-base">
          Please enter your details to sign in.
        </p>

        {/* Input Fields */}
        <div className="space-y-4 mb-10">
          <InputField
            type="email"
            label="Email"
            value={loginDetails.email}
            error={inputErrorHandler.email.message}
            onChange={(e) => handleInput("email", e.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            placeholder="email@example.com"
            onBlur={(e) => {
              if (e.target.value === "") {
                handleInputError("email", true, "Email is required!");
              } else {
                handleInputError("email", false, "");
              }
            }}
          />

          <InputField
            type="password"
            label="Password"
            value={loginDetails.password}
            error={inputErrorHandler.password.message}
            onChange={(e) => handleInput("password", e.target.value)}
            placeholder="**********"
            onBlur={(e) => {
              if (e.target.value === "") {
                handleInputError("password", true, "Password is required!");
              } else {
                handleInputError("password", false, "");
              }
            }}
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center text-xs mt-4">{errorMessage}</p>
        )}

        {/* Sign In Button */}
        <Button
          variant="contained"
          fullWidth
          type="submit"
          className={`mt-4 ${allFieldsChecked
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Sign in
        </Button>

        {/* OR Divider */}
        <div className="flex items-center justify-center mt-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Third-Party Login Options */}
        <div className="mt-6 flex flex-col gap-4">
          <Button
            onClick={opengoogleModal}
            variant="outlined"
            fullWidth
            className="flex items-center justify-center"
          >
            <FcGoogle size={24} className="mr-2" />
            Sign in with Google
          </Button>
        </div>

        {/* Forgot Password */}
        <Link
          className="block text-sm text-center text-blue-500 mt-6 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Google Login Modal */}
      <Modal open={isgoogleModalOpen} onClose={closegoogleModal}>
        <Box
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm mx-auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <h2 className="text-lg font-semibold text-blue-500 mb-4 text-center">
            Welcome to Minerva!
          </h2>
          <RadioGroup
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="space-y-4"
          >
            {/* Applicant Option */}
            <FormControlLabel
              value="applicant"
              control={<Radio />}
              label={
                <div>
                  <span className="font-medium">Applicant</span>
                  <p className="text-sm text-gray-500">
                     Greet let's you introduce your friend to their dream job in tech. As a reward, you get paid if they get interviewed or hired.
                  </p>
                </div>
              }
            />

            {/* Recruiter Option */}
            <FormControlLabel
              value="recruiter"
              control={<Radio />}
              label={
                <div>
                  <span className="font-medium">Recruiter</span>
                  <p className="text-sm text-gray-500">
                     With profound knowledge in the JOB field and specialized skills, we can assist you in accessing and recruiting the best candidates.
                  </p>
                </div>
              }
            />
          </RadioGroup>

          {/* Modal Buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="outlined"
              onClick={closegoogleModal}
              className="px-4 py-2"
            >
              Back
            </Button>
            {!user ? (
              <GoogleLoginButton setUser={setUser} userType={selectedOption} />
            ) : (
              <Button variant="contained" color="success">
                Success!
              </Button>
            )}
          </div>
        </Box>
      </Modal>
    </form>

  );
}
