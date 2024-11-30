import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

const SuccessModal = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="success-modal-title"
      aria-describedby="success-modal-description"
    >
      <Box
        className="flex flex-col items-center bg-white rounded-lg p-6 shadow-lg space-y-4"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          outline: 0,
          width: 400,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 60, color: "green" }} />
        <Typography id="success-modal-title" fontSize={30} color="success">
          Payment Successfully
        </Typography>
        <Typography id="success-modal-description" className="text-center text-gray-600">
          Please provide some brief information about yourself.
        </Typography>
        <Link to={'/resume-service/resumeapplication'}>
          <Button
            variant="contained"
            onClick={handleClose}
            className="bg-green-500 hover:bg-green-600"
            sx={{
              mt: 2,
              color: "white",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Okay
          </Button>
        </Link>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
