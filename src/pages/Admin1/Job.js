

import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, Button, InputAdornment,Divider } from '@mui/material';
import { Search } from '@mui/icons-material';
import { userType } from "libs/isAuth";
import JobTable from "./jobTable";

export default function Job() {
  const setPopup = useContext(SetPopupContext);
  let history = useNavigate();

  const [job, setJob] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [reloadContent, setReloadContent] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);

  const [location, setLocation] = React.useState('');
  const [jobType, setJobType] = React.useState('');
  const [salaryRange, setSalaryRange] = React.useState('');

  useEffect(() => {
    const allJob = apiList.jobs;
    // console.log(allJob);

    axios
      .get(allJob)
      .then((response) => {
        // console.log(response.data);
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  }, [reloadContent]);

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

  const handleDelete = () => {
    axios
      .delete(`${apiList.jobs}/${selectedJobId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        setReloadContent(!reloadContent);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
      });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = job.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };
  const th = ["Job", "Job type", "Skill", "Date upload", "Delete job"];

  return (
    <>
      <div className="flex items-center space-x-4 bg-white p-4 shadow-md rounded-lg mb-15">
        {/* Search Job Input */}
        <TextField
          variant="outlined"
          placeholder="Search Job"
          size="small"
          className="w-1/3"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search style={{ color: '#1E3A8A' }} />
              </InputAdornment>
            ),
            className: 'bg-gray-100 rounded-lg',
          }}
        />

        {/* Location Select */}
        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          className="w-1/6 bg-gray-100 rounded-lg"
        >
          <MenuItem value="" disabled>
            Select Location
          </MenuItem>
          <MenuItem value="New York">New York</MenuItem>
          <MenuItem value="San Francisco">San Francisco</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
        </Select>

        {/* Job Type Select */}
        <Select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          className="w-1/6 bg-gray-100 rounded-lg"
        >
          <MenuItem value="" disabled>
            Job Type
          </MenuItem>
          <MenuItem value="Full Time">Full Time</MenuItem>
          <MenuItem value="Part Time">Part Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>

        {/* Salary Range Select */}
        <Select
          value={salaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
          displayEmpty
          variant="outlined"
          size="small"
          className="w-1/6 bg-gray-100 rounded-lg"
        >
          <MenuItem value="" disabled>
            Salary Range
          </MenuItem>
          <MenuItem value="$30k - $50k">$30k - $50k</MenuItem>
          <MenuItem value="$50k - $70k">$50k - $70k</MenuItem>
          <MenuItem value="$70k - $100k">$70k - $100k</MenuItem>
        </Select>

        {/* Show All Filters Button */}
        <Button
          variant="contained"
          className="w-1/6"
        >
          Show All Filter
        </Button>
      </div>
       {/* Divider
       <Divider className="bg-gray-500 " sx={{ marginBottom: 2,  marginTop: 2 }} />    */}
          
      <JobTable
        th={th}
        currentItems={currentItems}
        job={job}
        itemsPerPage={itemsPerPage}
        selectedPage={selectedPage}
        setSelectedJobId={setSelectedJobId}
        setIsOpen={setIsOpen}
        setPopup={setPopup}
        userType={userType}
        paginate={paginate} />
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this job? All of the
                    candidates that has been referred will be deleted as well.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="mr-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-300 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => handleDelete()}
                  >
                    Delete
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
