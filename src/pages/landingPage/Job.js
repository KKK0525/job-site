import axios from "axios";
import JobAd from "components/JobAd";
import apiList from "../../libs/apiList";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Banner from "components/Banner";
import { userType } from "libs/isAuth";
import { SetPopupContext } from "App";
import { Button } from '@mui/material'

export default function Job(props) {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const { id } = useParams();
  const [job, setJob] = useState();
  const [allJob, setAllJob] = useState([]);
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [selectedPage, setSelectedPage] = useState(1);

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const userApply = () => {
    return (
      (job && job.status === "accepted") || (job && job.status === "finished")
    );
  };

  const handleApply = () => {
    // console.log(job._id);
    // console.log(sop);

    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    }

    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        {
          sop: sop,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  /* const handleClickJob = () => {
    history(`/${}`);
  }; */

  useEffect(() => {
    const checkAcceptedJob = async () => {
      try {
        const response = await axios.get(
          `${apiList.jobs}/${id}/check-accepted`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setHasAcceptedJob(response.data.hasAcceptedJob);
      } catch (error) {
        console.error(error);
      }
    };

    checkAcceptedJob();
  }, []);

  useEffect(() => {
    axios
      .get(`${apiList.jobs}/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const all = apiList.jobs;
    axios.get(all).then((response) => {
      setAllJob(response.data);
    });
  }, []);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allJob
    .filter((job) => job._id !== id)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start">
        {/* LEFT */}
        <div className="lg:w-7/12 w-full h-full lg:ml-10 lg:mr-5 px-4 md:mt-20 mt-10 pb-10">        
          <JobAd about={job} />
          <div className="text-center mx-auto mt-12 mb-10">
            {userType() === "applicant" && job ? (
              <>
                {job.maxPositions !== undefined && job.acceptedCandidates !== undefined ? (
                  <>
                    {job.maxPositions - job.acceptedCandidates > 0 ? (
                      <Link
                        onClick={() => handleApply()}
                        title={hasAcceptedJob ? "You already have an accepted job" : ""}
                      >
                        <Button fullWidth variant="contained">
                          {hasAcceptedJob ? "Job accepted!" : "Apply"}
                        </Button>
                      </Link>
                    ) : (
                      <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl cursor-not-allowed text-black">
                        Position Filled
                      </p>
                    )}
                  </>
                ) : null}
              </>
            ) : null}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-5/12 px-4 md:mt-20 mt-10 pt-10 pb-10">
          <p className="text-gray-500 font-semibold text-2xl mb-4">Similar Job Post</p>

          <div className="w-full flex flex-col gap-2">
            {currentItems.map(
              (job, index) =>
                job._id !== id && (
                  <a href={`/jobs/${job._id}`} key={index} className="w-full md:w-full bg-white hover: bg-gray-100 border border-gray-400 shadow-lg rounded-md p-4 text-wrap">
                    <div className="flex flex-row justify-between gap-3 p-2">
                      <img src={job?.recruiter.profile} alt={job?.recruiter.name} className="w-14 h-14 rounded-full" />
                      <div>
                        <p className="text-lg font-semibold truncate">{job.title}</p>
                        <span className="flex gap-2 items-center">{job.location}</span>
                      </div>
                      <div className="flex flex-row items-center justify-between w-full p-3">
                        <p className="bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm">
                          {job.jobType}
                        </p>
                        <span className="text-gray-500 text-sm">
                          {calculateDays(new Date(job.dateOfPosting))}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1">
                        {job.skillsets.map((tag, index) => (
                          <div key={index} className="bg-gray-500 py-1 px-3 text-xs font-bold text-white rounded-lg">
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm">
                        {job.recruiter.bio ? (
                          <span>{job.recruiter.bio.slice(0, 300) + "..."}</span>
                        ) : (
                          <div className="text-base">No description yet</div>
                        )}
                      </p>
                    </div>
                  </a>
                )
            )}
          </div>

          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(allJob.length / itemsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 rounded-full ${selectedPage === i + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-500 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
