import React, { useState, useContext } from "react";
import InputField from "components/InputField";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "../../../libs/apiList";
import { MuiChipsInput } from "mui-chips-input";
import { apiUploadImages } from "libs/uploadImage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';


export default function SignUp() {
  const history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [phone, setPhone] = useState("");
  const [chips, setChips] = useState([]);


  const handleChip = (newChips) => {
    setChips(newChips);
  };

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    dateOfBirth: new Date(),
    resume: "",
    profile: "",
    news: false,
    bio: "",
    contactNumber: "",
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const handleChange = (event) => {
    console.log(event.target.value);
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      type: event.target.value,
    }));
  };

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    education: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    skills: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    bio: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    contactNumber: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });

  // console.log("inputErrorHandler: ", inputErrorHandler);

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\+\d{1,4}\d{6,}$/;

    return phoneRegex.test(phoneNumber);
  };

  let allFieldsCheckedApplicant = false;
  let allFieldsCheckedRecruiter = false;

  if (signupDetails.type === "applicant") {
    allFieldsCheckedApplicant =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      chips.some((item) => item.trim() !== "") &&
      signupDetails.education.every(
        (item) => item.institutionName.trim() !== ""
      ) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";
  } else {
    allFieldsCheckedRecruiter =
      signupDetails.name.trim().length > 0 &&
      signupDetails.email.trim().length > 0 &&
      signupDetails.password.trim().length > 0 &&
      signupDetails.bio.trim().length > 0 &&
      (signupDetails.contactNumber.trim().length === 0 ||
        isValidPhoneNumber(signupDetails.contactNumber)) &&
      signupDetails.profile.trim().length > 0 &&
      typeof signupDetails.news === "boolean";
  }
  
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleInput = (key, value) => {
    setSignupDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
    // console.log(`Input ${key} value:`, value);
  };

  const handleLogin = () => {
    if (signupDetails.name === "") {
      setInputErrorHandler((prev) => ({
        ...prev,
        name: {
          message: "name is required",
        },
      }));
      return;
    } else if (signupDetails.email === "") {
      setInputErrorHandler((prev) => ({
        ...prev,
        email: {
          message: "email is required",
        },
      }));
      return;
    } else if (signupDetails.password === "") {
      setInputErrorHandler((prev) => ({
        ...prev,
        password: {
          message: "password is required",
        },
      }));
      return;
    }
    try {
      const tmpErrorHandler = {};
      Object.keys(inputErrorHandler).forEach((obj) => {
        if (
          inputErrorHandler[obj].required &&
          inputErrorHandler[obj].untouched
        ) {
          tmpErrorHandler[obj] = {
            required: true,
            untouched: false,
            error: true,
            message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
          };
        } else {
          tmpErrorHandler[obj] = inputErrorHandler[obj];
        }
      });

      let updatedDetails = {
        ...signupDetails,
        skills: chips.filter((item) => item.trim() !== ""),
        education: education
          .filter((edu) => edu.institutionName.trim() !== "")
          .map((edu) => ({
            institutionName: edu.institutionName,
            startYear: edu.startYear,
            endYear: edu.endYear,
          })),
      };
      setSignupDetails(updatedDetails);

      const verified = !Object.keys(tmpErrorHandler).some((obj) => {
        return tmpErrorHandler[obj].error;
      });

      if (!verified) {
        axios
          .post(apiList.signup, updatedDetails)
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("type", response.data.type);
            localStorage.setItem("id", response.data._id);
            // setLoggedin(isAuth());
            setPopup({
              open: true,
              icon: "success",
              message: "Logged in successfully",
            });
            history("/");
            // console.log("export" + response);
            // console.log(response?.data.type);
          })
          .catch((err) => {
            setPopup({
              open: true,
              icon: "warn",
              message: err.response.data.message,
            });
            // console.log(err.response.data.message);
          });
      } else {
        setInputErrorHandler(tmpErrorHandler);
        setPopup({
          open: true,
          icon: "error",
          message: "Incorrect Input",
        });
      }
    } catch (error) {
      setPopup({
        open: true,
        icon: "error",
        message: error.data.message,
      });
    }
  };

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      type: signupDetails.type,
      email: signupDetails.email,
      password: signupDetails.password,
      bio: signupDetails.bio,
      contactNumber: isValidPhoneNumber(signupDetails.contactNumber)
        ? `+${phone}`
        : "",
      profile: signupDetails.profile,
      news: signupDetails.news,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    // console.log(updatedDetails);

    if (!verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          localStorage.setItem("id", response.data._id);
          // setLoggedin(isAuth());
          setPopup({
            open: true,
            icon: "success",
            message: "Logged in successfully",
          });
          // console.log(response);
          history("/");
        })
        .catch((err) => {
          setPopup({
            open: true,
            icon: "error",
            message: err.response.data.message,
          });
          // console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        icon: "error",
        message: "Incorrect Input",
      });
    }
  };

  const uploadFile = async (e) => {
    e.stopPropagation();
    // setIsLoading(true);

    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await apiUploadImages(formData);
        if (response.status === 200) {
          const imageUrl = response.data.url; // URL returned by backend

          console.log(imageUrl);

          // setImagesPreview(imageUrl); // Set the preview image
          setSignupDetails((prevDetails) => ({
            ...prevDetails,
            profile: imageUrl, // Set profile URL for preview
          }));
          toast.success("Images uploaded successfully 👌");
        } else {
          toast.error("Error uploading images 🤯");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Error uploading images 🤯");
      } finally {
        // setIsLoading(false);
      }
    }
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 mt-10 md:py-24">
      <div className="bg-white rounded-2xl pt-10 md:px-8 px-6 pb-8 text-left md:w-4/12 w-11/12 mx-auto">
        <h2 className="text-4xl font-semibold text-gray-900 leading-none">
          Welcome to <span className="text-blue-500 bold">Miverva</span>
        </h2>
        <p className="text-md text-gray-600 pb-8">
          The information you add below is used to make your referrals more
          credible and it can be edited later.
        </p>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 bg-white">
            Select a type
          </label>
          <select
            className="block border border-grey-light w-full p-3 rounded mb-4"
            value={signupDetails.type}
            onChange={handleChange}
          >
            <option value="applicant" className="rounded mb-4 text-gray-950">
              Applicant
            </option>
            <option value="recruiter" className="rounded mb-4 text-gray-950">
              Recruiter
            </option>
          </select>
        </div>

        <InputField
          type="text"
          label="Name"
          value={signupDetails.name}
          error={inputErrorHandler.name.message}
          onChange={(e) => handleInput("name", e.target.value)}
          placeholder="Firstname Lastname"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("name", true, "Name is required!");
            } else {
              handleInputError("name", false, "");
            }
          }}
          className="mb-4"
        />
        <InputField
          type="email"
          label="Email"
          value={signupDetails.email}
          error={inputErrorHandler.email.message}
          onChange={(e) => handleInput("email", e.target.value)}
          placeholder="email@example.com"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("email", true, "Email is required!");
            } else {
              handleInputError("email", false, "");
            }
          }}
          className="mb-4"
        />
        <InputField
          type="password"
          label="Password"
          value={signupDetails.password}
          error={inputErrorHandler.password.message}
          onChange={(e) => handleInput("password", e.target.value)}
          placeholder="Your password"
          onBlur={(e) => {
            if (e.target.value === "") {
              handleInputError("password", true, "Password is required!");
            } else {
              handleInputError("password", false, "");
            }
          }}
          className="mb-4"
        />
        {signupDetails.type === "applicant" ? (
          <>
            {education.map((edu, index) => (
              <div
                className="mb-2"
                onBlur={(e) => {
                  if (e.target.value === "") {
                    handleInputError(
                      "education",
                      true,
                      "Education is required!"
                    );
                  } else {
                    handleInputError("education", false, "");
                  }
                }}
              >
                <div className="flex justify-between" key={index}>
                  <InputField
                    type="text"
                    label={`Institution Name ${index + 1}`}
                    value={edu.institutionName}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].institutionName = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Institution name"
                    className="mb-1"
                  />
                  <InputField
                    type="number"
                    label={`Start Year ${index + 1}`}
                    value={edu.startYear}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].startYear = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="Start year"
                    className="mb-1"
                  />
                  <InputField
                    type="number"
                    label={`End Year ${index + 1}`}
                    value={edu.endYear}
                    onChange={(e) => {
                      const newEducation = [...education];
                      newEducation[index].endYear = e.target.value;
                      setEducation(newEducation);
                    }}
                    placeholder="End year"
                    className="mb-1"
                  />
                </div>
                <span className="text-[#ff3131] text-sm font-semibold">
                  {inputErrorHandler.education.message}
                </span>
              </div>
            ))}
            <div className="pb-5">
              <Button
                variant="contained"
                fullWidth
                onClick={() =>
                  setEducation([
                    ...education,
                    {
                      institutionName: "",
                      startYear: "",
                      endYear: "",
                    },
                  ])
                }
              >
                Add another institution details
              </Button>
            </div>

            <>
              <MuiChipsInput
                label="Skill *"
                helperText="Please enter to add skill"
                value={chips}
                onChange={handleChip}
                className="block border border-grey-light w-full p-3 rounded mb-4 focus:ring-primary focus:border-primary"
              />
            </>
          </>
        ) : (
          <>
            <InputField
              label="bio (upto 250 words)"
              style={{ width: "100%" }}
              value={signupDetails.bio}
              onChange={(e) => {
                if (
                  e.target.value.split(" ").filter(function (n) {
                    return n !== "";
                  }).length <= 250
                ) {
                  handleInput("bio", e.target.value);
                }
              }}
              error={inputErrorHandler.bio.message}
              onBlur={(e) => {
                if (e.target.value === "") {
                  handleInputError("bio", true, "Bio is required!");
                } else {
                  handleInputError("bio", false, "");
                }
              }}
              className="mb-4"
            />
            <div
              onBlur={(e) => {
                if (e.target.value === "") {
                  handleInputError(
                    "contactNumber",
                    true,
                    "Contact Number is required!"
                  );
                } else {
                  handleInputError("contactNumber", false, "");
                }
              }}
            >
              <div>
                <PhoneInput
                  country={"vn"}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <span className="text-[#ff3131] text-sm font-semibold">
                {inputErrorHandler.contactNumber.message}
              </span>
            </div>
          </>
        )}
        <div className="mb-8">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Avatar <span className="text-red-500">*</span>
        </h2>
        <div className="w-full">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload Avatar
            <VisuallyHiddenInput
              type="file"
              onChange={uploadFile}
              multiple
            />
          </Button>
          <div className="w-full flex flex-col items-center mb-6">
            <h3 className="font-medium py-4">Select image</h3>
            <div className="flex justify-center items-center gap-4">
              {signupDetails.profile ? (
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <img
                    src={signupDetails.profile}
                    alt="preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              ) : (
                <p>No images selected</p>
              )}
            </div>
          </div>
        </div>
      </div>

        <label className="block text-black text-sm font-medium mt-8 focus:outline-none outline-none">
          <input
            className="mr-2 leading-tight text-primary"
            type="checkbox"
            checked={signupDetails.news}
            onChange={() =>
              setSignupDetails((prevDetails) => ({
                ...prevDetails,
                news: !prevDetails.news,
              }))
            }
          />
          <span className="text-sm pb-5">
            Keep me up-to-date on exclusive Greet updates and new job posts! You
            can opt-out at any time.
          </span>
        </label>
        <div className="pt-5">
          <Button
            variant="contained"
            fullWidth
            className={`${(signupDetails.type === "applicant" && allFieldsCheckedApplicant) ||
              (signupDetails.type === "recruiter" && allFieldsCheckedRecruiter)
              ? "bg-blue-500 text-white hover:bg-blue-600 border-yellow-100 cursor-pointer"
              : "bg-gray-300 text-white cursor-not-allowed "
              }`}
            onClick={() => {
              signupDetails.type === "applicant"
                ? handleLogin()
                : handleLoginRecruiter();
            }}
          disabled={
            (signupDetails.type === "applicant" &&
              !allFieldsCheckedApplicant) ||
            (signupDetails.type === "recruiter" && !allFieldsCheckedRecruiter)
          }
          >
            Create your account
          </Button>
        </div>
        <p className="text-xs text-center mt-6 text-blue-500">
          By creating an account you agree to Greet's Terms and Conditions.
        </p>
      </div>
    </div>
  );
}
