import { useEffect, useState } from "react";
import Select from "components/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import apiList from "../../libs/apiList";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import unorm from "unorm";
import PaidBell from "./paidBell";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Tooltip,
  TextField,
  IconButton,
  Box,
} from "@mui/material";

const times = ["Newest first", "Oldest first"];
const th = ["Job", "Job type", "Skill", "Date upload", "Headcount"];

export default function JobTable({ jobs }) {
  let history = useNavigate();
  let [displayedJobs, setDisplayedJobs] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [currentInput, setCurrentInput] = useState("");
  const [applicantsCount, setApplicantsCount] = useState({});
  const [applicationes, setApplicationes] = useState([]);
  const [datafornoti, setDatafornoti] = useState([]);
  const { id } = useParams();

  const userId = id || localStorage.getItem("id");

  let [selectedTime, setSelectedTime] = useState(times[0]);

  useEffect(() => {
    const validJobs = Array.isArray(jobs) ? jobs : [];

    setDisplayedJobs(validJobs);
    setOriginalData(validJobs);

    const fetchData = async () => {
      try {
        let address = apiList.jobs;

        const response = await axios.get(address, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setOriginalData(response.data);
        setDisplayedJobs(response.data);

        const counts = {};
        for (const job of response.data) {
          let countAddress = `${apiList.applicants}?jobId=${job._id}`;
          let countResponse;

          try {
            countResponse = await axios.get(countAddress, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            setApplicationes(countResponse.data);

            counts[job._id] = countResponse.data.length;
          } catch (error) {
            console.error(`Error fetching count for job ${job._id}`, error);
            counts[job._id] = 0;
          }
        }

        setApplicantsCount(counts);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [jobs]);

  function handleClick(_id) {    
    history(`/admin/${_id}`);
  }

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

  function time(input) {
    setSelectedTime(input);

    setDisplayedJobs((prevDisplayedJobs) => {
      const sortedJobs = [...prevDisplayedJobs];

      if (input === "Newest first") {
        sortedJobs.sort(
          (a, b) =>
            new Date(b.dateOfPosting).getTime() - new Date(a.dateOfPosting).getTime()
        );
      } else {
        sortedJobs.sort(
          (a, b) =>
            new Date(a.dateOfPosting).getTime() - new Date(b.dateOfPosting).getTime()
        );
      }

      return [...sortedJobs];
    });
  }

  useEffect(() => {
    time(selectedTime);
  }, [selectedTime, originalData]);

  const normalizeText = (text) => {
    return unorm
      .nfkd(text)
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  };

  function search(input) {
    const filter = normalizeText(input);

    if (filter) {
      const newData = originalData.filter((job) => {
        return normalizeText(job.title).includes(filter);
      });

      setDisplayedJobs(newData);
    } else {
      setDisplayedJobs(originalData);
    }
    setCurrentInput(filter);
  }

  return (
    <>
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between", gap: 3 }}>
        <Box sx={{ flex: 1, position: "relative" }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search job . . ."
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
              search(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ marginRight: "8px", color: "gray" }}
                />
              ),
            }}
          />
        </Box>
        <PaidBell applications={applicationes} />
        <Select className="w-40" selected={selectedTime} statuses={times} changeStatus={time} />
      </Box>
      <div className="min-h-screen">
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {th.map((t, index) => (
                  <TableCell key={index} sx={{ textTransform: "uppercase", fontWeight: "bold" }}>
                    {t}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {displayedJobs.length !== 0 ? (
              <TableBody>
                {displayedJobs
                  .filter((currentJob) => currentJob.userId === userId)
                  .map((currentJob, index) => (
                    <TableRow key={index} hover onClick={() => handleClick(currentJob._id)}>
                      <TableCell>{currentJob.title}</TableCell>
                      <TableCell>{currentJob.jobType}</TableCell>
                      <TableCell>
                        {currentJob.skillsets.map((tag, index) => (
                          <Chip
                            key={index}
                            label={tag}
                            size="small"
                            sx={{
                              color: "gray",
                              textTransform: "uppercase",
                              fontWeight: "bold",
                            }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>{calculateDays(new Date(currentJob.dateOfPosting))}</TableCell>
                      <TableCell>
                        <Tooltip title={`${applicantsCount[currentJob._id]} applicants`} arrow>
                          <Typography variant="body2">
                            {applicantsCount[currentJob._id]} people
                          </Typography>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={th.length}>
                    <Typography align="center" sx={{ mt: 3, color: "gray" }}>
                      No jobs matched your search...
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
