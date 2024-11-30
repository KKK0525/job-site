import { SetPopupContext } from "App";
import axios from "axios";
import InputField from "components/InputField";
import apiList from "libs/apiList";
import { getId } from "libs/isAuth";
import { apiUploadImages } from "libs/uploadImage";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

export default function CompanySettings({ profile, user }) {
  const setPopup = useContext(SetPopupContext);
  const getUser = getId();

  const [tmpProfile, setTmpProfile] = useState();
  const [originalProfile] = useState(profile);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
    profile: "",
    contactNumber: "",
    banner: "",
  });

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

  useEffect(() => {
    setTmpProfile(profile);
  }, [profile]);

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
        setProfileDetails(response.data);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  const uploadBanner = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFile(file, "banner");
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
          toast.success("Images uploaded successfully");
        } else {
          toast.error("Error uploading images");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error("Error uploading images");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      // console.log("fetch: ", `${apiList.updateUser}/${getUser}`);

      const updatedDetails = {
        ...profileDetails,
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

  return (
    <div className="p-10 bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-medium text-gray-900">Edit Public Profile</h3>
      <p className="mt-2 text-sm text-gray-600">
        This information will be displayed publicly, so be careful what you share.
      </p>

      {/* Profile Image Section */}
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
        </div>      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <InputField
          label="Name"
          type="text"
          value={profileDetails?.name}
          onChange={(e) =>
            setProfileDetails({
              ...profileDetails,
              name: e.target.value,
            })
          }
          placeholder="Enter recruiter name"
        />
        <InputField
          label="Contact Number"
          type="number"
          value={profileDetails?.contactNumber}
          onChange={(e) =>
            setProfileDetails({
              ...profileDetails,
              contactNumber: e.target.value,
            })
          }
          placeholder="Phone number"
        />
      </div>

      {/* About Section */}
      <div className="mt-6">
        <label className="block text-gray-700 text-sm font-medium">
          About
        </label>
        <textarea
          className="block w-full border border-gray-300 rounded-lg p-3 mt-2 focus:ring-primary focus:border-primary"
          rows="6"
          placeholder="Write about your company here."
          value={profileDetails?.bio}
          onChange={(e) =>
            setProfileDetails({
              ...profileDetails,
              bio: e.target.value,
            })
          }
        ></textarea>
      </div>

      {/* Banner Caption */}
      <div className="mt-6">
        <InputField
          label="Banner Caption"
          type="text"
          value={profileDetails?.banner}
          onChange={(e) => {
            setProfileDetails({
              ...profileDetails,
              banner: e.target.value,
            });
          }}
          placeholder="Enter banner caption"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => handleUpdate()}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={() => setTmpProfile(originalProfile)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
