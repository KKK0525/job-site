import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import apiList from "../../libs/apiList";
import FilterPopup from "../filterPopup";
import Myjob from "./Myjob";
import unorm from "unorm";
import Pagination from '@mui/material/Pagination';
import { Button } from "@mui/material";

export default function JobBoard({ title, props }) {
  const searchRef = useRef(null);
  const [jobs, setJobs] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type (/) search");
  const [searchValue, setSearchValue] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: {
      salary: {
        status: false,
        desc: false,
      },
      duration: {
        status: false,
        desc: false,
      },
      rating: {
        status: false,
        desc: false,
      },
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
      if (event.key === "Escape") {
        setSearchValue("");
        if (searchRef.current) {
          searchRef.current.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleChange = (event) => {
    setSearchValue(event.target.value);
    setSearchOptions({
      ...searchOptions,
      query: event.target.value,
    });
  };

  const sortedJob = [...jobs].sort((a, b) => {
    if (a.rating !== b.rating) {
      return b.rating - a.rating;
    }

    return new Date(b.dateOfPosting) - new Date(a.dateOfPosting);
  });

  const currentDate = new Date();

  const limitedJobs = sortedJob
    .filter((job) => {
      const postingDate = new Date(job.dateOfPosting);
      const differenceInDays =
        (currentDate - postingDate) / (1000 * 60 * 60 * 24);
      return differenceInDays <= 7;
    })
  const displayLimitedJobs = limitedJobs.slice(0, 6);

  useEffect(() => {
    getData();
  }, [searchOptions]);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [
        ...searchParams,
        `jobType=Full%20Time` || `jobType=Full%20time`,
      ];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [
        ...searchParams,
        `jobType=Part%20Time` || `jobType=Part%20time`,
      ];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, `jobType=Work%20From%20Home`];
    }
    if (searchOptions.salary[0] !== 0) {
      searchParams = [
        ...searchParams,
        `salaryMin=${searchOptions.salary[0] * 1000}`,
      ];
    }
    if (searchOptions.salary[1] !== 100) {
      searchParams = [
        ...searchParams,
        `salaryMax=${searchOptions.salary[1] * 1000}`,
      ];
    }
    if (searchOptions.duration !== "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }

    let asc = [],
      desc = [];

    Object.keys(searchOptions.sort).forEach((obj) => {
      const item = searchOptions.sort[obj];
      if (item.status) {
        if (item.desc) {
          desc = [...desc, `desc=${obj}`];
        } else {
          asc = [...asc, `asc=${obj}`];
        }
      }
    });
    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");

    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // const newData = response.data.filter((job) => {
        //   const normalizedTitle = normalizeText(job.title);
        //   const normalizedQuery = normalizeText(searchOptions.query);
        //   return normalizedTitle.includes(normalizedQuery);
        // });
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleJobTypeChange = (type) => {
    setSearchOptions({
      ...searchOptions,
      jobType: {
        ...searchOptions.jobType,
        [type]: !searchOptions.jobType[type],
      },
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = limitedJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div>
        <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12">
          {title === false ? (
            <div className="block pt-4">
              <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center md:pb-5 pb-5 pt-10">
                Trending jobs ({limitedJobs.length})
              </h1>
            </div>
          ) : (
            <React.Fragment>
              <div className="mb-10">
                <div className="bg-blue-500">
                  {/* Page Title */}
                  <div className="pt-24">
                    <h5 className="text-center text-4xl text-white font-bold mb-3">Your Ultimate Job </h5>
                    <h5 className="text-center text-4xl text-white font-bold mb-2">Search Companion</h5>
                    <p className="text-md md:text-md  text-gray-200 text-center pb-3 md:pb-5 ">Are you looking for the perfect job or the ideal candidate?
                      Find your dream job<br /> with thousands of job postings across industries</p>
                  </div>
                  {/* Search Bar */}
                  <div className="flex justify-center mb-6 pb-20">
                    <div className="relative w-full md:w-3/6 bg-slate-50 rounded-lg shadow-md">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="search"
                        className="w-full p-4 pl-10 text-sm text-black border border-gray-300 bg-gray-100 rounded-lg focus:ring-blue-500 focus:bg-white focus:outline-none transition-all duration-200 ease-in-out"
                        placeholder={placeholderText}
                        value={searchOptions.query}
                        onChange={handleChange}
                        onFocus={() => setPlaceholderText("Search for jobs")}
                        onBlur={() => setPlaceholderText("Search by Job Title...")}
                        ref={searchRef}
                      />
                    </div>
                  </div>
                </div>
                {/* Job Count & Filters */}
                <div className="flex flex-wrap justify-between items-center gap-4 px-4">
                  <span className="text-slate-600 text-lg md:text-2xl font-semibold">
                    {jobs.length} Jobs Available
                  </span>

                  {/* Pagination */}
                  <Pagination
                    count={Math.ceil(limitedJobs.length / itemsPerPage)}
                    page={currentPage}
                    variant="outlined"
                    color="primary"
                    onChange={handleChangePage}
                    className="flex justify-center"
                  />

                  {/* Filter Popup */}
                  <FilterPopup
                    open={filterOpen}
                    searchOptions={searchOptions}
                    setSearchOptions={(newSearchOptions) => {
                      setSearchOptions({
                        ...newSearchOptions,
                        salary: newSearchOptions.salary,
                      });
                    }}
                    handleClose={() => setFilterOpen(false)}
                    getData={() => {
                      getData();
                      setFilterOpen(false);
                    }}
                    handleJobTypeChange={handleJobTypeChange}
                  />
                </div>
              </div>
              <div className="border-t border-gray-300 my-8"></div>
            </React.Fragment>
          )}
          {title === false ? (
            <React.Fragment>
              <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 py-20">
                {displayLimitedJobs.length > 0 ? (
                  displayLimitedJobs.map((job, index) => {
                    return (
                      <Myjob
                        className="grid lg:grid-cols-4 gap-4 grid-cols-1 mx-2"
                        job={job}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center text-center ">
                    <h5 className="text-red-500 text-2xl">No jobs found</h5>
                  </div>
                )}
              </div>
            </React.Fragment>
          ) : (
            <>
              <div className="grid lg:grid-cols-3 gap-6 grid-cols-1 sm:w-full mx-2">
                {currentItems.length > 0 ? (
                  currentItems.map((job, index) => {
                    return (
                      <Myjob
                        className="grid lg:grid-cols-3 gap-6 grid-cols-1 mx-2 "
                        job={job}
                        key={index}
                      />
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center text-center ">
                    <h5 className="text-red-500 text-2xl">No jobs found</h5>
                  </div>
                )}
              </div>
              <div className="border-t border-gray-300 my-8"></div>
              <Pagination
                count={Math.ceil(limitedJobs.length / itemsPerPage)} // Calculate the total number of pages
                page={currentPage}
                variant="outlined"
                color="primary"
                onChange={handleChangePage}
                style={{ display: "flex", justifyContent: "center", marginTop: "16px" }} // Inline styles for pagination
              />
            </>
          )}

          {title === false ? (
            <div className="w-48 mt-16 mx-auto">
              <Link
                to="jobs"
                className="hover:bg-blue-700 flex cursor-pointer items-center font-semibold text-md justify-center px-8 py-3 bg-blue-500 rounded-xl text-light"
              >
                View all jobs
                <FontAwesomeIcon
                  className="ml-3 mb-0.5 text-sm"
                  icon={faArrowRight}
                />
              </Link>
            </div>
          ) : null}

          <div className="mt-20 col-span-3 transform ease-in duration-100 w-full bg-gray-300 rounded-2xl p-6 text-left relative">
            <div className="grid grid-cols-2 md:p-10 p-4 gap-6">
              <h1 className="text-gray-700 lg:text-6xl text-4xl font-bold  sm:mx-auto lg:mx-0 mb-4 md:col-span-1 col-span-2">
                Let’s find your Talents
              </h1>

              <div className="md:col-span-1 col-span-2">
                <p className="text-xl text-black md:mb-8 mb-16 md:pt-4">
                  Leave your contact so our Customer Love team can support you
                </p>
                <Link
                  to={`/jobs/talent-pool/refer`}
                ><Button variant="contained" size="large">
                    Contact for me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
