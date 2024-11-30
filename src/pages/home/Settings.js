import React, { useState, useEffect, useContext } from "react";
import InputField from "components/InputField";
import { apiUploadImages } from "libs/uploadImage";
import axios from "axios";
import { SetPopupContext } from "App";
import { styled } from '@mui/material/styles';
import apiList from "../../libs/apiList";
import { getId } from "libs/isAuth";
import { useParams } from "react-router-dom";
import { MuiChipsInput } from "mui-chips-input";
import { toast } from "react-toastify";
import { Button, Typography, Box, Input, IconButton } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { MdCloudUpload } from "react-icons/md";

export default function Settings() {
  const setPopup = useContext(SetPopupContext);
  const getUser = getId();

  const [isLoading, setIsLoading] = useState(false);
  const [imagesPreview, setImagesPreview] = useState("");
  const [fileResume, setFileResume] = useState("");
  const [open, setOpen] = useState(false);
  const [chips, setChips] = useState([]);

  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setFileResume(file);
      setFileName(file.name);
    } else {
      toast.error("Please select a valid PDF file.");
      setFileName("");
    }
  };

  const handleUploadClick = () => {
    document.getElementById("pdf-file-input").click();
  };

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

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    password: "",
    skills: [],
    resume: "",
    profile: "",
    education: [
      {
        institutionName: "",
        startYear: "",
        endYear: "",
      },
    ],
    dateOfBirth: new Date(),
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(`${apiList.user}/${getUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setProfileDetails({
          ...response.data,
          skills: response.data.skills || [],
          education: response.data.education.map((edu) => ({
            institutionName: edu.institutionName ? edu.institutionName : "",
            startYear: edu.startYear ? edu.startYear : "",
            endYear: edu.endYear ? edu.endYear : "",
          })),
        });
        setChips(response.data.skills || []);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  // console.log("update education: ", profileDetails.education);

  const handleUpdate = async () => {
    try {
      // console.log("fetch: ", `${apiList.updateUser}/${getUser}`);

      const updatedEducation = profileDetails.education
        .filter((edu) => edu.institutionName.trim() !== "")
        .map((edu) =>
          edu.endYear === "" ? { ...edu, endYear: undefined } : edu
        );

      const updatedDetails = {
        ...profileDetails,
        education: updatedEducation,
        skills: chips.filter((item) => item.trim() !== ""),
      };

      // console.log("updatedDetails:", updatedDetails);

      const response = await axios.put(
        `${apiList.updateUser}/${getUser}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // console.log("Server response:", response.data);

      setPopup({
        open: true,
        icon: "success",
        message: response.data.message,
      });

      // Fetch updated data after the update
      getData();
      setOpen(false);
    } catch (err) {
      console.error("Update error:", err);

      setPopup({
        open: true,
        icon: "error",
        message: err.response?.data?.message || "Error occurred during update.",
      });
    }
  };

  const uploadFile = async (e) => {
    e.stopPropagation();
    setIsLoading(true);

    const files = e.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0]);

      try {
        const response = await apiUploadImages(formData);
        if (response && response.status === 200 && response.data) {
          const imageUrl = response.data.url; // URL returned by backend
          // console.log(imageUrl);
          setImagesPreview(imageUrl); // Set the preview image
          setProfileDetails((prevDetails) => ({
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
        setIsLoading(false);
      }
    }
  };
  // console.log("profileDetails", profileDetails);

  const uploadResume = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", fileResume);
    formData.append("userId", profileDetails.userId);
    formData.append("name", profileDetails.name);
    // console.log("select file: ", fileResume);
    const result = await axios.post(apiList.uploadResume, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        if (result && result.status === 200 && result.data) {
          toast.success("Resume uploaded successfully");
          setFileName("");
        } else {
          toast.error("Error uploading images");
        }
      })
  };

  const handleChip = (newChips) => {
    setChips(newChips);
  };

  function toLocalTime(utcDateTime) {
    if (utcDateTime) {
      const utcDate = new Date(utcDateTime);
      const localDate = new Date(
        utcDate.getTime() + utcDate.getTimezoneOffset() * 60000
      );
      return localDate.toISOString().slice(0, 16);
    } else {
      return "";
    }
  }

  function toUTC(localDateTime) {
    const localDate = new Date(localDateTime);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );
    return utcDate.toISOString();
  }

  // const deadline = new Date(job.deadline).toLocaleDateString();

  return (
    <div className="bg-gray-100 md:mt-20 mt-20 sm:py-16 lg:py-20">
      <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-12 mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 text-center mb-8">
          Settings
        </h2>
        {/* Name Input */}
        <div className="mb-6">
          <InputField
            label="Name"
            type="text"
            placeholder="Firstname Lastname"
            value={profileDetails.name}
            onChange={(e) =>
              setProfileDetails({ ...profileDetails, name: e.target.value })
            }
            className="w-full"
          />
        </div>
        {/* Date of Birth Input */}
        <div className="mb-6">
          <InputField
            label="Date of Birth"
            type="datetime-local"
            placeholder="dd/mm/yyyy"
            value={toLocalTime(profileDetails.dateOfBirth)}
            onChange={(e) => {
              const localTime = e.target.value;
              const utcTime = toUTC(localTime);
              setProfileDetails({
                ...profileDetails,
                dateOfBirth: utcTime,
              });
            }}
            className="w-full"
          />
        </div>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Education Details
          </h3>
          {profileDetails.education.map((edu, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <InputField
                label={`Institution Name ${index + 1}`}
                type="text"
                value={edu.institutionName}
                onChange={(e) => {
                  const newEducation = [...profileDetails.education];
                  newEducation[index].institutionName = e.target.value;
                  setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    education: newEducation,
                  }));
                }}
              />
              <InputField
                label="Start Year"
                type="number"
                value={edu.startYear}
                onChange={(e) => {
                  const newEducation = [...profileDetails.education];
                  newEducation[index].startYear = e.target.value;
                  setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    education: newEducation,
                  }));
                }}
              />
              <InputField
                label="End Year"
                type="number"
                value={edu.endYear}
                onChange={(e) => {
                  const newEducation = [...profileDetails.education];
                  newEducation[index].endYear = e.target.value;
                  setProfileDetails((prevDetails) => ({
                    ...prevDetails,
                    education: newEducation,
                  }));
                }}
              />
            </div>
          ))}
          <Button
            variant="outlined"
            fullWidth
            onClick={() => {
              setProfileDetails((prevDetails) => ({
                ...prevDetails,
                education: [
                  ...prevDetails.education,
                  {
                    institutionName: "",
                    startYear: "",
                    endYear: "",
                  },
                ],
              }));
            }}
          >
            Add Another Institution
          </Button>
        </div>
        {/* Skills Input */}
        <div className="mb-8">
          <MuiChipsInput
            label="Skills"
            helperText="Enter and press Enter to add a skill"
            value={chips}
            onChange={handleChip}
            className="w-full"
          />
        </div>

        {/* Avatar Upload */}
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
                {profileDetails.profile ? (
                  <div className="relative w-48 h-48 flex items-center justify-center">
                    <img
                      src={profileDetails.profile}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            mt: 4,
            p: 2,
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "info.main", textAlign: "center" }}
          >
            Do you have a resume?
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}
          >
            <Input
              id="pdf-file-input"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              sx={{ display: "none" }}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleUploadClick}
              startIcon={<UploadFileIcon />}
              sx={{
                textTransform: "none",
                px: 3,
                py: 1.5,
                borderRadius: "8px",
                fontWeight: "bold",
                width: { xs: "100%", sm: "auto" },
              }}
            >
              Choose Resume
            </Button>
            {fileName ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                  mt: 2,
                }}
              >
                <PictureAsPdfIcon color="error" />
                <Typography
                  variant="body1"
                  sx={{
                    color: "gray",
                    maxWidth: "200px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {fileName}
                </Typography>
                <IconButton
                  color="success"
                  aria-label="upload resume"
                  size="large"
                  onClick={uploadResume}
                >
                  <MdCloudUpload />
                </IconButton>
              </Box>
            ) : (
              <Typography variant="body2" sx={{ color: "gray", mt: 2 }}>
                No resume selected
              </Typography>
            )}
          </Box>
        </Box>

        {/* Save Changes Button */}
        <div className="flex items-center justify-center pt-6">
          <Button
            variant="contained"
            size="large"
            onClick={handleUpdate}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
