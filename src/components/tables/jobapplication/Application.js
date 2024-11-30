import { Typography } from "@material-tailwind/react";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { SetPopupContext } from "App";
import axios from "axios";
import { Modal, Rating } from "flowbite-react";
import apiList from "libs/apiList";
import { server } from "libs/apiList";
import { useContext } from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import Zoom from '@mui/material/Zoom';
import { TbPlayerEject } from "react-icons/tb";
import { FaStreetView } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

const ApplicationTile = (props) => {
  const { application, getData } = props;
  const setPopup = useContext(SetPopupContext);

  const appliedOn = new Date(application.dateOfApplication);

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  const getResume = () => {
    if (
      application.jobApplicant.resume &&
      application.jobApplicant.resume !== ""
    ) {
      const address = `${apiList.downloadResume}/${application.jobApplicant._id}`;
      // console.log(address);
      axios(address, {
        method: "GET",
        responseType: "blob",
      })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            `resume-${application.jobApplicant.name}.pdf`
          );
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(url);
          setPopup({
            open: true,
            icon: "success",
            message: "Download file PDF successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          setPopup({
            open: true,
            icon: "error",
            message: "Error",
          });
        });
    } else {
      setPopup({
        open: true,
        icon: "error",
        message: "No resume found",
      });
    }
  };

  const updateStatus = (status) => {

    const address = `${apiList.applications}/${application._id}`;
    const statusData = {
      status: status,
      dateOfJoining: new Date().toISOString(),
    };
    axios
      .put(address, statusData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log("Update status successful:", response.data.message);
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const buttonSet = {
    applied: (
      <div className="w-[5.75rem] flex flex-row py-4 text-sm gap-5">
        <div>
          <Tooltip title='Shortlist!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Shortlist" size="large" onClick={() => updateStatus("shortlisted")}>
              <FaStreetView fontSize="inherit" className='text-blue-500' />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title='Reject!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Reject" size="large" onClick={() => updateStatus("rejected")}>
              <TbPlayerEject fontSize="inherit" className='text-orange-500' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    ),
    shortlisted: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-5">
        <div>
          <Tooltip title='Accept!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Reject" size="large" onClick={() => updateStatus("accepted")}>
              <FaCheck fontSize="inherit" className='text-green-500' />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title='Reject!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Reject" size="large" onClick={() => updateStatus("rejected")}>
              <TbPlayerEject fontSize="inherit" className='text-red-500' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    ),
    rejected: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-5">
        <div>
          <Tooltip title='Reject!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Reject" size="large" onClick={() => updateStatus("rejected")}>
              <TbPlayerEject fontSize="inherit" className='text-red-500' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    ),
    accepted: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-5">
        <div>
          <Tooltip title='Accepted!' TransitionComponent={Zoom} placement="top">
            <IconButton aria-label="Reject" size="large">
              <FaCheckDouble fontSize="inherit" className='text-green-500' />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    ),
    cancelled: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-5">
        <div>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Cancelled
          </button>
        </div>
      </div>
    ),
    finished: (
      <div className="w-[5.75rem] py-4 whitespace-nowrap text-sm text-gray-500 flex flex-row gap-5">
        <button>
          <button
            className="w-full h-full flex items-center justify-center uppercase font-semibold rounded-md"
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Finished
          </button>
        </button>
      </div>
    ),
  };

  return (
    <tr className="flex content-between ml-10">
      <td className="px-6 py-4  text-sm text-gray-500 flex-1 w-[30rem]">
        <img
          src={`${application.jobApplicant.profile}`}
          alt={`${application.jobApplicant.name}'s profile`}
          className="w-[10rem] h-[10rem] rounded-full"
        />
      </td>
      <td className="px-10 py-4 text-sm text-gray-500 flex-1 w-[30rem]">
        <div>
          <Typography variant="h5">{application.jobApplicant.name}</Typography>
        </div>
        <div>
          <Rating
            value={
              application.jobApplicant.rating !== -1
                ? application.jobApplicant.rating
                : null
            }
            readOnly
          />
        </div>
        <div>
          Applied On:{" "}
          <span className="font-semibold">
            {appliedOn.toLocaleDateString()}
          </span>
        </div>
        <div>
          Education:{" "}
          <span className="font-semibold">
            {application.jobApplicant.education
              .map((edu) => {
                return `${edu.institutionName} (${edu.startYear}-${edu.endYear ? edu.endYear : "Ongoing"})`;
              })
              .join(", ")}
          </span>
        </div>
        <div className="mt-2">
          <td className="text-bold">Skills:</td>
          <td className="text-right">
            <div className="flex flex-row-reverse gap-1">
              {application.jobApplicant.skills.slice(0,3).map((tag, index) => (
                <div
                  key={index}
                  className="relative grid select-none items-center whitespace-nowrap rounded-lg 
                      bg-gray-500 py-1.5 px-1 font-sans text-xs font-bold uppercase text-white ml-2"
                >
                  <span className="">{tag}</span>
                </div>
              ))}
            </div>
          </td>
        </div>
        {/* <div>phone number:</div> */}
      </td>
      {/* Adjusted the width of this td to move it closer to the profile section */}
      <td className="px-10 py-4 flex items-center justify-end w-[30%] whitespace-nowrap text-sm text-gray-500 gap-5">
        <Tooltip title='Resume download' TransitionComponent={Zoom} placement="top">
          <IconButton aria-label="download" size="large" onClick={getResume}>
            <FaCloudDownloadAlt fontSize="inherit" className='text-orange-500' />
          </IconButton>
        </Tooltip>
        <div className="flex-1 container rounded-md">
          {buttonSet[application.status]}
        </div>
      </td>
      <Modal>
        <div className="p-[20px] outline-none flex flex-col justify-center min-w-[30%] items-center">
          <button
            className="p-[10px 50px]"
            onClick={() => {
              // console.log("Submit button clicked");
            }}
          >
            Submit
          </button>
        </div>
      </Modal>
    </tr>
  );
};

export default ApplicationTile;
