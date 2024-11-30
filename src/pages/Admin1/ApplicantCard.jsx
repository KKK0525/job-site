import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Button, IconButton, Typography, Divider, Box } from '@mui/material';

const ApplicantCard = ({ applicant, index, setSelectedUser, openModal }) => {
  return (
    <Box
      key={index}
      className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all"
      sx={{
        width: { xs: '100%', sm: '100%', md: '23rem' }, // Adjust the width for different screen sizes
        margin: 'auto',
        marginY: 2,
      }}
    >
      {/* Profile Image */}
      <Box className="w-full flex justify-center mb-4">
        <img
          src={applicant.profile}
          alt={`${applicant.name}'s profile`}
          className="w-20 h-20 rounded-full object-cover"
        />
      </Box>

      {/* Applicant Name */}
      <Typography variant="h6" className="text-center font-semibold text-gray-800">
        {applicant.name}
      </Typography>
      <Typography className=" text-gray-500 mb-2">
        {applicant.position || "Position not specified"}
      </Typography>

      {/* Applicant Description */}
      <Typography variant="body2" className="text-gray-600 text-sm  mb-4">
        {applicant.description || "This is where the applicant's description goes."}
      </Typography>

      {/* Education */}
      <Box className="w-full mb-4">
        <Typography variant="body2" className="text-gray-700 font-medium">
          Education:
        </Typography>
        <Typography className="text-gray-500 text-sm">
          {applicant.education && applicant.education.length > 0 ? (
            applicant.education.map((edu, index) => (
              <span key={index}>
                {edu.institutionName} ({edu.startYear} - {edu.endYear || "Ongoing"})
                {index !== applicant.education.length - 1 && ', '}
              </span>
            ))
          ) : (
            <span className="text-red-500">Not updated</span>
          )}
        </Typography>
      </Box>

      {/* Skills */}
      <Box className="w-full mb-4">
        <Typography variant="body2" className="text-gray-700 font-medium">
          Skills:
        </Typography>
        <Box className="flex gap-2 flex-wrap">
          {applicant.skills && applicant.skills.length > 0 ? (
            applicant.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white text-xs font-semibold rounded-full px-3 py-1"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-red-500 font-semibold">Not updated</span>
          )}
        </Box>
      </Box>

      {/* Date of Birth */}
      <Box className="w-full mb-4">
        <Typography variant="body2" className="text-gray-700 font-medium">
          Date of Birth:
        </Typography>
        <Typography variant="body2" className="text-gray-500">
          {applicant.dateOfBirth ? (
            new Date(applicant.dateOfBirth).toLocaleDateString()
          ) : (
            <span className="text-red-500">Not updated</span>
          )}
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ marginBottom: 2 }} />

      {/* Action Button */}
      <Box className="w-full flex justify-center mt-4">
        <IconButton
          size="large"
          onClick={() => {
            setSelectedUser(applicant._id);
            openModal(applicant);
          }}
        >
          <FontAwesomeIcon icon={faTrashCan} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ApplicantCard;
