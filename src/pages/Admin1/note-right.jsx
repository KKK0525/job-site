import React from "react";
import { Card, CardContent, Typography, Avatar, Divider } from "@mui/material";

function JobCard() {
  return (
    <Card className="max-w-md mx-auto rounded-lg shadow-lg p-6 bg-white">
      {/* Company Logo */}
      <div className="flex justify-center">
        <Avatar
          src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" // Replace with your logo URL
          alt="Google Logo"
          className="w-24 h-24"
          sx={{ width: 96, height: 96 }}
        />
      </div>

      {/* Job Title */}
      <Typography
        variant="h5"
        className="mt-4 text-center font-semibold text-gray-800"
      >
        Senior UI/UX Designer
      </Typography>

      {/* Company Name */}
      <Typography
        variant="subtitle1"
        className="mt-2 text-center text-gray-600"
      >
        Google, Inc
      </Typography>

      {/* Divider */}
      <Divider className="my-4" />

      {/* Qualification Section */}
      <Typography
        variant="subtitle1"
        className="font-semibold text-gray-800 mb-2"
      >
        Qualification:
      </Typography>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>A bachelor's degree and 1 year experience.</li>
        <li>
          A portfolio of professional UI/UX design work for both web and mobile
          platforms.
        </li>
        <li>Excellent written and verbal communication skills.</li>
        <li>
          Multi-tasking and time-management skills, with the ability to
          prioritize tasks.
        </li>
      </ul>

      {/* Responsibilities Section */}
      <Typography
        variant="subtitle1"
        className="font-semibold text-gray-800 mt-6 mb-2"
      >
        Responsibilities & Duties:
      </Typography>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          Illustrate design ideas using storyboards, process flows, and
          sitemaps.
        </li>
        <li>
          Develop UI mockups and prototypes that clearly illustrate how sites
          function and look.
        </li>
      </ul>
    </Card>
  );
}

export default JobCard;
