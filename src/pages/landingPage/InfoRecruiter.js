import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Chip from '@mui/joy/Chip';
import Divider from '@mui/joy/Divider';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { Info as InfoIcon, Phone as PhoneIcon } from '@mui/icons-material';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from "axios";
import apiList from "../../libs/apiList";
import { Rating } from "@material-tailwind/react";
import { userType } from "libs/isAuth";
import { SetPopupContext } from "App";

export default function InfoRecruiter() {
  const [hasAcceptedJob, setHasAcceptedJob] = useState(false);
  const [company, setCompany] = useState();
  const [open, setOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [sop, setSop] = useState("");
  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const setPopup = useContext(SetPopupContext);
  let history = useNavigate();
  const { id } = useParams();

  const userApply = () => {
    return (
      (jobs && jobs.status === "accepted") ||
      (jobs && jobs.status === "finished")
    );
  };

  const handleApply = () => {
    if (userApply()) {
      setPopup({
        open: true,
        icon: "success",
        message:
          "You already have an accepted job. Cannot apply for another job.",
      });
      return;
    }
    let address = apiList.jobs;
    const jobId = jobs[0]?._id;

    axios
      .post(
        `${address}/${jobId}/applications`,
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
        history(`/jobs/${jobId}/refer`);
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        // console.log(err.response);
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  useEffect(() => {
    let address = apiList.user;
    axios
      .get(`${address}/${id}`)
      .then((response) => {
        // console.log(response);
        setCompany(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let address = apiList.jobs;
        const response = await axios.get(`${address}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setJobs(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const checkAcceptedJob = async () => {
      try {
        const response = await axios.get(
          `${apiList.jobs}/${jobs._id}/check-accepted`,
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

    if (jobs.length > 0) {
      checkAcceptedJob();
    }
  }, [jobs]);

  const filterjob = jobs.filter((obj) => obj.userId === id);

  return (
    <>
      <div className="md:pt-32 pt-32 pb-20">
        <div className="lg:w-9/12 w-11/12 mx-auto rounded-xl shadow-lg p-6 bg-white">
          {/* Company Info Section */}
          <div className="flex items-center gap-4 md:gap-6 mb-6">
            <img
              alt="company logo"
              className="md:h-24 md:w-24 w-16 h-16 rounded-md shadow-md"
              src={company?.profile}
            />
            <div>
              <h1 className="font-semibold lg:text-4xl text-2xl text-gray-800">{company?.name}</h1>
              <p className="text-gray-600">{company?.industry}</p>
            </div>
          </div>

          {/* About and Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-14 gap-6 mt-6 mb-20">
            {/* About Section */}
            <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <InfoIcon className="text-blue-500" />
                <h1 className="text-2xl font-medium text-gray-800">About {company?.name}</h1>
              </div>
              <p className="md:text-xl text-md text-gray-700">{company?.bio}</p>
            </div>
            {/* Contact Section */}
            <div className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <PhoneIcon className="text-green-500" />
                <h1 className="text-2xl font-medium text-gray-800">Phone Contact</h1>
              </div>
              <p className="md:text-xl text-md text-gray-700">{company?.contactNumber}</p>
            </div>
          </div>

          {/* Company Image Section (Optional) */}
          {/* Uncomment if you want to show an image */}
          {/* <div className="mt-6">
    <img
      src={company?.profile}
      alt="company"
      className="w-full lg:w-[30%] h-auto rounded-md mx-auto"
    />
  </div> */}
        </div>

        {/* Jobs Section */}
        <div className="bg-light">
          <div className="md:w-10/12 w-11/12 mx-auto h-full md:pb-28 pb-12 pt-20">
            <div className="block pt-4">
              <h1 className="md:text-4xl text-4xl font-bold text-gray-900 text-center md:pb-16 pb-12">
                Jobs at {company?.name} <span>({filterjob.length})</span>
              </h1>
            </div>

            {/* Jobs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.length > 0 ? (
                jobs
                  .filter((job) => job.userId === id)
                  .map((job, index) => {
                    const deadline = new Date(job.deadline).toLocaleDateString();
                    return (
                      < Card key={index} size="lg" variant="outlined" className="hover:-translate-y-2 hover:shadow-lg" >
                        <Chip size="sm" variant="outlined" color="neutral">
                          Posted By : {job.recruiter.name}
                        </Chip>
                        <div className="flex flex-col gap-2 justify-between">
                          <Typography level="h2" color="primary">{job.title}</Typography>
                          <div className="md:flex flex-row justify-center items-center">
                            <Rating
                              className="text-yellow-400"
                              value={job.rating !== -1 ? job.rating : null}
                              readonly
                            />
                            <span className="font-semibold">{" "}</span>
                            <h6 className="md:text-xl text-lg font-bold text-gray-500">
                              {job.rating}
                            </h6>
                          </div>
                        </div>
                        <Divider inset="none" />
                        <List size="sm" sx={{ mx: 'calc(-1 * var(--ListItem-paddingX))' }}>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Duration:{" "}
                            <span className="font-medium text-xl">
                              {job.duration !== 0
                                ? `${job.duration} month`
                                : `Flexible`}
                            </span>
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Location:{" "}
                            <span className="font-medium text-xl">
                              {job.location}
                            </span>
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Date Of Posting:{" "}
                            <span className="font-medium text-xl">
                              {deadline}
                            </span>
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Number of Applicants:
                            <span className="font-medium text-xl">
                              {" "}
                              {job.maxApplicants}
                            </span>
                          </ListItem>
                          <ListItem>
                            <ListItemDecorator>
                              <Check />
                            </ListItemDecorator>
                            Remaining Number of Positions:{" "}
                            <span className="font-medium text-xl">
                              {job.maxPositions - job.acceptedCandidates}
                            </span>
                          </ListItem>
                          <ListItem>
                            {job.skillsets && job.skillsets.length > 0 ? (
                              <>
                                <ListItemDecorator>
                                  <Check />
                                </ListItemDecorator>
                                Skills:{" "}
                                <div className="pl-1 flex mt-3 gap-2">
                                  {job.skillsets
                                    ? job.skillsets.slice(0, 2).map((skill, index) => (
                                      <div
                                        key={index}
                                        className="whitespace-nowrap rounded-lg bg-blue-300 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white"
                                      >
                                        <span>{skill}</span>
                                      </div>
                                    ))
                                    : null}
                                </div>
                              </>
                            ) : null}
                          </ListItem>
                        </List>
                        <Divider inset="none" />
                        <CardActions>
                          <Typography level="title-lg" sx={{ mr: 'auto' }}>
                            ${job.salary}{' '}
                            <Typography textColor="text.tertiary" sx={{ fontSize: 'sm' }}>
                              / hiring reward
                            </Typography>
                          </Typography>
                          {userType() === "applicant" ? (
                            <>
                              {job.maxPositions - job.acceptedCandidates > 0 ? (
                                <Link                                >
                                  <Button variant="soft" color="neutral" onClick={() => handleApply()}>
                                    {hasAcceptedJob ? "Job accepted!" : "Apply"}
                                  </Button>
                                </Link>
                              ) : (
                                <p className="text-md justify-center px-8 py-3 bg-gray-400 rounded-xl text-black">
                                  Position Filled
                                </p>
                              )}
                            </>
                          ) : null}
                          <Link
                            to={`/jobs/${job._id}`}
                          >
                            <Button
                              variant="soft"
                              color="neutral"
                              endDecorator={<KeyboardArrowRight />}
                            >
                              About the Job
                            </Button>
                          </Link>
                        </CardActions>
                      </Card>
                    );
                  })
              ) : (
                <h5 className="text-center text-xl font-medium text-gray-500">
                  No jobs found
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}