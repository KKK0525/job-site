import React from "react";
import { Card, CardContent, Typography, Avatar, Divider, Chip, Box } from "@mui/material";

function RecruiterCard({ recruiter }) {
  return (
    <Card
      className="rounded-lg shadow-lg p-4 w-full max-w-sm mx-auto bg-white hover:shadow-xl transition-shadow"
    >
      {/* Company Logo */}
      <Box className="flex justify-center">
        <Avatar
          src={recruiter.profile || "/default-logo.png"}
          alt={`${recruiter.profile}.name profiel`}
          className="w-16 h-16"
          sx={{ width: 64, height: 64 }}
        />
      </Box>

      {/* Title and Role */}
      <CardContent className="text-center">
        <Typography variant="h6" className="font-semibold text-gray-800">
          {recruiter.name}
        </Typography>
        <Typography variant="body2" className="text-gray-500 mt-1">
          {recruiter.contactNumber}
        </Typography>
      </CardContent>

      {/* Divider */}
      <Divider className="my-2" />

      {/* Description */}
      <Typography variant="body2" className="text-gray-600 text-center px-4 h-48">
        {recruiter.bio}
      </Typography>

      {/* Divider */}
      <Divider className="my-4" />
    </Card>
  );
}

export default RecruiterCard;
