import { useContext, useEffect, useState, useRef } from "react";
// import jobVoice from "../../assets/job-voice.png"
import { GiMoneyStack } from "react-icons/gi";
import { GiDuration } from "react-icons/gi";
import { SlLocationPin } from "react-icons/sl";
import { BsCalendar2Date } from "react-icons/bs";
import { MdPeopleOutline } from "react-icons/md";
import { SiWelcometothejungle } from "react-icons/si";
import { GiCursedStar } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";
import { Rating } from "@mui/material";
import apiList from "../../libs/apiList";
import { SetPopupContext } from "App";
import { userType } from "libs/isAuth";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import PaymentModal from "components/paymentModal";

const Myjob = ({ job }, index) => {
  let history = useNavigate();
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [recruiters, setRecruiters] = useState([]);
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const userApply = () => {
    return (
      (job && job.status === "accepted") || (job && job.status === "finished")
    );
  };

  const handleApply = (paystate) => {
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
          paystate: paystate,
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

  useEffect(() => {
    if (userType() === "applicant") {
      const checkAcceptedJob = async () => {
        try {
          const response = await axios.get(
            `${apiList.jobs}/${job._id}/check-accepted`,
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
    }
  }, []);

  useEffect(() => {
    if (job) {
      const userID = job.userId;
      axios.get(`${apiList.allRecruiter}`).then((response) => {
        const filteredRecruiters = response.data.allUser.filter(
          (recruiter) => recruiter.userId === userID
        );
        setRecruiters(filteredRecruiters);
      });
    }
  }, [job]);

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
    <div>
      <div
        className="flex flex-col justify-center transform ease-in duration-100 
        hover:-translate-y-2 hover:shadow-lg w-full h-full outline-blue-400
        bg-white rounded-2xl p-6 text-left cursor-default outline outline-2 outline-offset-2 "
        style={{
          backgroundImage: "url('/img/job-card-bg.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        <div className="items-center text-left pb-4">
          <div className="flex flex-col items-center">
            {recruiters.map((recruiter, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-28 h-28 rounded-full mr-4 outline-blue-600"
                  src={recruiter?.profile||`http://localhost:5000/sign-up/default_avarta.webp`}
                  alt="Company logo"
                />
                <p className="text-2xl font-bold text-blue-400 leading-none pt-2">
                  {job.title}
                </p>
                <p className="text-md text-gray-600">
                  Posted By : {job.recruiter.name}
                </p>
              </div>
            ))}
          </div>
        </div>
        {job.rating !== -1 && (
          <div className="ml-10 pb-1 flex gap-2">
            <Rating
              className="text-yellow-400"
              value={job.rating || null}
              readOnly
            />
            <span className="font-semibold">-</span>
            <h6 className="md:text-xl text-lg font-bold text-gray-500">
              {job.rating}
            </h6>
          </div>
        )}
        <p className="flex flex-row pl-1 pb-1">
          <GiMoneyStack
            className="text-2xl text-blue-500 mr-2 ml-1"
          />
          <span className="text-xl font-medium">{job.salary} $</span>
          <span className="text-xl text-red-500">
            {" "}
            / hiring reward
          </span>
        </p>
        <p className="flex flex-row pl-1">
          <GiDuration
            className="text-2xl text-blue-500 mr-3.5 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Duration:{" "}
            <span className="font-medium text-xl">
              {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
            </span>
          </span>
        </p>
        <p className="flex flex-row pl-1">
          <SlLocationPin
            className="text-2xl text-blue-500 mr-3.5 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Location:{" "}
            <span className="font-medium text-xl">{job.location}</span>
          </span>
        </p>

        <p className="flex flex-row pl-1">
          <BsCalendar2Date
            className="text-2xl text-blue-500 mr-3 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Date Of Posting:{" "}
            <span className="font-medium text-xl">
              {calculateDays(new Date(job.dateOfPosting))}
            </span>
          </span>
        </p>
        <p className="flex flex-row pl-1">
          <MdPeopleOutline
            className="text-2xl text-blue-500 mr-3 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Number of Applicants:
            <span className="font-medium text-xl"> {job.maxApplicants}</span>
          </span>
        </p>
        <p className="flex flex-row pl-1">
          <SiWelcometothejungle
            className="text-xl text-blue-500 mr-3 ml-1"
          />
          <span className="text-base font-semibold tracking-wide">
            Remaining Number of Positions:{" "}
            <span className="font-medium text-xl">
              {job.maxPositions - job.acceptedCandidates}
            </span>
          </span>
        </p>
        <div className="flex items-baseline flex-wrap">
          {job.skillsets && job.skillsets.length >= 0 ? (
            <>
              <GiCursedStar
                className="text-2xl text-blue-500 mr-3 ml-1"
              />
              <span className="text-base font-semibold tracking-wide">
                Skill:{" "}
              </span>
              <div className="pl-1 flex mt-3 gap-2">
                {job.skillsets
                  ? job.skillsets.slice(0,2).map((skill, index) => (
                    <div
                      key={index}
                      className="whitespace-nowrap rounded-lg bg-blue-400 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                    >
                      <span>{skill}</span>
                    </div>
                  ))
                  : null}
              </div>
            </>
          ) : null}
        </div>
        <Stack direction="row" spacing={2} className="pt-10">
          {userType() === "applicant" && job ? (
            <>
              {job.maxPositions !== undefined &&
                job.acceptedCandidates !== undefined ? (
                <>
                  {job.maxPositions - job.acceptedCandidates > 0 ? (
                    <div>
                      <PaymentModal apply={() => handleApply()} hasAcceptedJob={hasAcceptedJob} />
                      {/* <Button variant="contained" color="success" size="small" onClick={() => handleApply()}>
                         {hasAcceptedJob ? "Job accepted!" : "Apply"}
                      </Button> */}
                    </div>
                    // <Link
                    //   className={`hover:bg-green-500 hover:text-white ease-out duration-300 flex items-center font-semibold 
                    //     text-md justify-center px-8 py-3 bg-green-300 rounded-xl text-gray-800 ${hasAcceptedJob
                    //       ? "opacity-50 cursor-not-allowed"
                    //       : "cursor-pointer"
                    //     }`}
                    //   onClick={() => handleApply()}

                    //   title={
                    //     hasAcceptedJob ? "You already have an accepted job" : ""
                    //   }
                    // >
                    //   {hasAcceptedJob ? "Job accepted!" : "Apply"}
                    // </Link>
                  ) : (
                    <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl cursor-not-allowed text-black">
                      Position Filled
                    </p>
                  )}
                </>
              ) : null}
            </>
          ) : null}
          <Link to={`/jobs/${job._id}`}>
            <Button variant="outlined" href="#contained-buttons">
              About the job
            </Button>
          </Link>
        </Stack>
      </div>
    </div>
  );
};

export default Myjob;
