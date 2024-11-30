import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ApplicantPagiation = ({ all, itemsPerPage, selectedPage, paginate }) => {
  // Calculate the total number of pages
  const totalPages = Math.ceil(all.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    paginate(value);
  };

  return (
    <div className="flex justify-center mt-4">
      <Stack spacing={2}>
        <Pagination
          count={totalPages}            // total pages
          page={selectedPage}            // current page
          onChange={handlePageChange}    // event handler for page change
          color="primary"                // color theme
          shape="circular"                // shape of the buttons (can also be "text" or "outlined")
          variant="outlined"             // variant style (you can choose "text" or "outlined")
          size="medium"                  // size of the pagination (can be "small", "medium", or "large")
        />
      </Stack>
    </div>
  );
};

export default ApplicantPagiation;
