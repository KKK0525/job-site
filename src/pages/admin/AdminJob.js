import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import JobEditor from "components/JobEditor";
import JobSettings from "components/JobSettings";
import CandidateTable from "components/tables/CandidateTable";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SetPopupContext } from "App";
import { Button, Tabs, Tab, Box, Typography } from "@mui/material";

export default function AdminJob() {
  const { id } = useParams();
  const setPopup = useContext(SetPopupContext);

  let [active, setActive] = useState(0);
  let [referrals, setReferrals] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
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

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    let searchParams = [`myjobs=1`];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, `jobType=Full%20Time`];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, `jobType=Part%20Time`];
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
    // console.log(queryString);
    let address = apiList.jobs;
    if (queryString !== "") {
      address = `${address}?${queryString}`;
    }

    // console.log(address);
    axios
      .get(`${address}/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setJobs(response.data);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  };

  // console.log("name job: ", jobs);
  const handleTabChange = (_, newValue) => setActiveTab(newValue);

  return (
    <div className="bg-gray-50 min-h-screen">
    <div className="container mx-auto pt-40 pb-24">
      {jobs
        .filter((job) => job._id === id)
        .map((job, index) => (
          <Link to="/admin" className="flex items-center text-lg mb-4" key={index}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="mr-2 text-gray-600"
            />
            <span className="text-gray-600 font-medium">{job.title}</span>
          </Link>
        ))}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="Job management tabs"
        >
          <Tab label="Referrals" />
          <Tab label="Job Description" />
          <Tab label="Job Settings" />
        </Tabs>
      </Box>

      <Box className="mt-8">
        {activeTab === 0 && (
          <CandidateTable id={id} referrals={referrals} />
        )}
        {activeTab === 1 && (
          <JobEditor
            jobToEdit={jobs}
            props={{ job: jobs, getData }}
            id={id}
          />
        )}
        {activeTab === 2 && (
          <JobSettings props={{ jobs, getData }} id={id} />
        )}
      </Box>
    </div>
  </div>
  );
}
