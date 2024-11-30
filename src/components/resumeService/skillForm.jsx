import React from "react";
import { TextField, Button, Tooltip, Box, InputAdornment } from "@mui/material";
import { Person, Phone, Check, Clear } from "@mui/icons-material";
import InputMask from "react-input-mask";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from 'axios';
import { SetPopupContext } from "App";
import apiList from "../../libs/apiList";
import { getId } from '../../libs/isAuth';

export default function SkillForm() {

  const [errors, setErrors] = React.useState({});
  const setPopup = React.useContext(SetPopupContext);
  const myId = getId();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };

  const [formData, setFormData] = React.useState({
    userId: myId,
    username: "",
    mobile: "",
    experience: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Name is required.";
    if (
      !formData.mobile.trim() ||
      !/^\(\+\d{2}\)\d{10}$/.test(formData.mobile)
    ) {
      newErrors.mobile = "Enter a valid phone number (+91)1234567890.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log(`this is data : `,formData)
      axios
      .post(
        `${apiList.resumeApplications}`,formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
      })
      .catch((err) => {
        const errorMessage = err.response?.data?.message || "An error occurred";
        setPopup({
          open: true,
          icon: "error",
          message: errorMessage,
        });
        console.error("Error details:", err); 
      });

    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormData({ username: "", mobile: "", experience: "" });
    setErrors({});
  };

  return (
    <Box
      className="p-6 max-w-lg mx-auto min-h-[400px] pt-20 mt-20"
      sx={{
        padding: "24px",
        background: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-xxl font-bold text-gray-800 mb-4 mt-20">
        Please provide some brief information about yourself.
      </h1>

      {/* Name Field */}
      <Box mb={3}>
        <TextField
          label="Your Name"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={!!errors.username}
          helperText={errors.username}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person color="primary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Mobile Field with Mask */}
      <Box mb={3}>
        <InputMask
          mask="(+99)9999999999"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              label="Your Phone Number"
              variant="outlined"
              fullWidth
              name="mobile"
              error={!!errors.mobile}
              helperText={errors.mobile}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          )}
        </InputMask>
      </Box>

      {/* Rich Text Editor */}
      <Box mb={3}>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={formData.experience}
          onChange={(value) =>
            setFormData((prevState) => ({ ...prevState, experience: value }))
          }
          placeholder="What kind of experience do you have?"
          style={{
            borderRadius: "4px",
            minHeight: "150px",
            border: "1px solid #e0e0e0",
          }}
        />
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" mt={4}>
        <Tooltip title="Clear all fields">
          <Button
            variant="outlined"
            color="primary"
            onClick={handleReset}
            startIcon={<Clear />}
          >
            Reset
          </Button>
        </Tooltip>

        <Tooltip title="Submit your details">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            endIcon={<Check />}
          >
            Submit
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
