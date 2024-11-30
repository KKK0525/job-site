import React, { useState } from "react";
import JobTable from "components/tables/JobTable";
import NoJobs from "components/emptyStates/NoJobs";
import apiList from "../../libs/apiList";
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdminJobs() {
  const jobs = apiList.jobs;
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearchChange = (filteredData) => {
    setFilteredJobs(filteredData);
  };

  if (!jobs) {
    return <NoJobs />;
  }

  return (
    <>
      <div className="bg-white pb-3 ">
        <div className="w-10/12 mx-auto mt-32 mb-56">
          <div className="flex flex-row justify-between ">
            <h3 className="text-4xl mt-8" to="/admin">
              My Jobs
            </h3>
            <Link to="/create-new-job">
              <Button variant="contained" color="primary">
                Create new job
              </Button>
            </Link>
          </div>
          <JobTable jobs={jobs} onChange={handleSearchChange} />
        </div>
      </div>
    </>
  );
}
