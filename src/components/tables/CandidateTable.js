import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import ApplicationTile from "./jobapplication/Application";
import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

export default function CandidateTable() {
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();

  const [applications, setApplications] = useState([]);
  const [existingIds, setExistingIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  const getData = useCallback(() => {
    setLoading(true);
    let searchParams = [];

    if (searchOptions.status.rejected) {
      searchParams.push("status=rejected");
    }
    if (searchOptions.status.applied) {
      searchParams.push("status=applied");
    }
    if (searchOptions.status.shortlisted) {
      searchParams.push("status=shortlisted");
    }

    let asc = [];
    let desc = [];
    Object.keys(searchOptions.sort).forEach((key) => {
      const sortOption = searchOptions.sort[key];
      if (sortOption.status) {
        sortOption.desc ? desc.push(`desc=${key}`) : asc.push(`asc=${key}`);
      }
    });

    searchParams = [...searchParams, ...asc, ...desc];
    const queryString = searchParams.join("&");
    const address = queryString
      ? `${apiList.applicants}?jobId=${id}&${queryString}`
      : `${apiList.applicants}?jobId=${id}`;

    axios
      .get(address, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setApplications(response.data);
        const newIds = response.data.map((app) => app._id);
        const newIdsSet = new Set(newIds);

        setExistingIds((prevIds) => {
          const prevIdsSet = new Set(prevIds);
          const newIdsArray = [...newIdsSet].filter((id) => !prevIdsSet.has(id));

          // if (newIdsArray.length > 0) {
          //   toast.success(`New applications received! IDs: ${newIdsArray.join(", ")}`);
          // }

          return [...prevIds, ...newIdsArray];
        });
      })
      .catch((err) => {
        setApplications([]);
        setPopup({
          open: true,
          icon: "error",
          message: `No Candidate Applications` || "Error fetching data",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, searchOptions, setPopup]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-md min-h-screen">
      <Typography variant="h6" className="text-gray-800 font-semibold mb-4">
        Candidate Applications
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <CircularProgress />
        </div>
      ) : applications.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {applications.map((app, index) => (
                <TableRow key={index}>
                  <TableCell className="">
                    <ApplicationTile application={app} getData={getData} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography className="text-center text-gray-600 mt-8">
          No Applications Found
        </Typography>
      )}
    </div>
  );
}
