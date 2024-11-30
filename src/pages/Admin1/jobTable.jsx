import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Tooltip
} from '@mui/material';

const JobTable = ({ th, currentItems, job, itemsPerPage, selectedPage, setSelectedJobId, setIsOpen, setPopup, userType, paginate }) => {

  function calculateDays(date) {
    let daysAgo = Math.floor((new Date() - date) / (1000 * 3600 * 24));
    
    if (daysAgo < 1) {
      return "Today";
    } else if (daysAgo < 2) {
      return daysAgo + " day ago";
    } else if (daysAgo < 7) {
      return daysAgo + " days ago";
    } else if (daysAgo < 14) {
      return "1 week ago";
    } else if (daysAgo < 30) {
      return Math.floor(daysAgo / 7) + " weeks ago";
    } else if (daysAgo < 60) {
      return "1 month ago";
    } else {
      return Math.floor(daysAgo / 30) + " months ago";
    }
  }

  return (
    <div className="mt-8">
      {/* Table Container */}
      <TableContainer component={Paper} className="rounded-md shadow-lg">
        <Table aria-label="Job Listings Table">
          <TableHead>
            <TableRow>
              {th.map((t) => (
                <TableCell key={t} className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                  {t}
                </TableCell>
              ))}
              <TableCell className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* Job Listings */}
          {currentItems.length !== 0 ? (
            <TableBody>
              {currentItems.map((currentJob, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {/* Job Title */}
                  <TableCell className="text-sm text-gray-800">
                    {currentJob.title}
                  </TableCell>

                  {/* Job Type */}
                  <TableCell className="text-sm text-gray-800">
                    {currentJob.jobType}
                  </TableCell>

                  {/* Skillsets */}
                  <TableCell className="text-sm text-gray-800">
                    <div className="flex gap-2 flex-wrap">
                      {currentJob.skillsets.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-900 text-white rounded-md px-2 py-1 text-xs font-bold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  {/* Date of Posting */}
                  <TableCell className="text-sm text-gray-800">
                    {calculateDays(new Date(currentJob.dateOfPosting))}
                  </TableCell>

                  {/* Delete Button */}
                  <TableCell>
                    <Tooltip title="Delete Job">
                      <IconButton
                        color="error"
                        onClick={() => {
                          if (userType() === "admin") {
                            setSelectedJobId(currentJob._id);
                            setIsOpen(true);
                          } else {
                            setPopup({
                              open: true,
                              icon: "error",
                              message: "You don't have permissions to delete the job",
                            });
                          }
                        }}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={th.length + 1} className="text-center text-gray-500 py-8">
                  No jobs matched your search...
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          count={Math.ceil(job.length / itemsPerPage)}
          page={selectedPage}
          onChange={(event, page) => paginate(page)}
          color="primary"
          className="mt-2"
        />
      </div>
    </div>
  );
};

export default JobTable;
