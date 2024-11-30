import React from "react";
import { TextField, Button, IconButton, Tooltip } from "@mui/material";
import { AttachFile, AssignmentInd } from "@mui/icons-material";
// import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function SkillForm({ setMyexperience }) {

  const [formData, setFormData] = React.useState({
    experience: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMyexperience(formData);
  };

  const handleReset = () => {
    setFormData((prevState) => ({ ...prevState, experience: '' }));
  };

  return (
    <div className="p-6 max-w-lg mx-auto  min-h-[400px] bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Your Experience</h1>

      {/* Description */}
      <TextField
        label="Your Experience"
        multiline
        rows={8}
        fullWidth
        variant="outlined"
        className="mb-4"
        name="experience"
        value={formData.experience}
        onChange={handleInputChange}
      />

      {/* Buttons */}
      <div className="flex justify-between mt-10">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          ok
        </Button>
      </div>
    </div>
  );
}
