import InputField from "components/InputField";
import JobAd from "components/JobAd";
import ReactQuill from "react-quill";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-quill/dist/quill.snow.css";
import { MuiChipsInput } from "mui-chips-input";
import { SetPopupContext } from "App";
import apiList from "../libs/apiList";
import axios from "axios";
import isAuth from "libs/isAuth";
import { Button } from "@mui/material";


export default function JobCreator({ jobToEdit }) {
  const setPopup = useContext(SetPopupContext);

  const [tags, setTags] = useState([]);
  const [category, setCategory] = useState("");

  const categoryOptions = [
    { value: "accounting", label: "Accounting" },
    { value: "administrative support", label: "Administrative Support" },
    { value: "advertising", label: "Advertising" },
    { value: "aerospace engineering", label: "Aerospace Engineering" },
    { value: "agriculture", label: "Agriculture" },
    { value: "artificial intelligence", label: "Artificial Intelligence" },
    { value: "architecture", label: "Architecture" },
    { value: "automotive engineering", label: "Automotive Engineering" },
    { value: "banking", label: "Banking" },
    { value: "biotechnology", label: "Biotechnology" },
    { value: "blockchain development", label: "Blockchain Development" },
    { value: "brand management", label: "Brand Management" },
    { value: "broadcast journalism", label: "Broadcast Journalism" },
    { value: "business analysis", label: "Business Analysis" },
    { value: "business development", label: "Business Development" },
    { value: "chemical engineering", label: "Chemical Engineering" },
    { value: "civil engineering", label: "Civil Engineering" },
    { value: "cloud computing", label: "Cloud Computing" },
    { value: "commercial real estate", label: "Commercial Real Estate" },
    { value: "construction management", label: "Construction Management" },
    { value: "consumer goods", label: "Consumer Goods" },
    { value: "content creation", label: "Content Creation" },
    { value: "corporate finance", label: "Corporate Finance" },
    { value: "counseling", label: "Counseling" },
    { value: "creative writing", label: "Creative Writing" },
    { value: "customer service", label: "Customer Service" },
    { value: "design", label: "Design" },
    { value: "data analysis", label: "Data Analysis" },
    { value: "development", label: "Development" },
    { value: "data science & analytics", label: "Data Science & Analytics" },
    { value: "database administration", label: "Database Administration" },
    { value: "digital marketing", label: "Digital Marketing" },
    { value: "e-commerce", label: "E-commerce" },
    { value: "education administration", label: "Education Administration" },
    { value: "electrical engineering", label: "Electrical Engineering" },
    { value: "energy management", label: "Energy Management" },
    { value: "environmental science", label: "Environmental Science" },
    { value: "event planning", label: "Event Planning" },
    { value: "fashion design", label: "Fashion Design" },
    { value: "film production", label: "Film Production" },
    { value: "financial analysis", label: "Financial Analysis" },
    { value: "game development", label: "Game Development" },
    { value: "graphic design", label: "Graphic Design" },
    { value: "healthcare administration", label: "Healthcare Administration" },
    { value: "hospitality management", label: "Hospitality Management" },
    { value: "human resources", label: "Human Resources" },
    { value: "industrial design", label: "Industrial Design" },
    { value: "information technology", label: "Information Technology" },
    { value: "interior design", label: "Interior Design" },
    { value: "investment banking", label: "Investment Banking" },
    { value: "journalism", label: "Journalism" },
    { value: "legal services", label: "Legal Services" },
    { value: "logistics management", label: "Logistics Management" },
    { value: "machine learning", label: "Machine Learning" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "marketing", label: "Marketing" },
    { value: "mechanical engineering", label: "Mechanical Engineering" },
    { value: "medical research", label: "Medical Research" },
    { value: "mobile app development", label: "Mobile App Development" },
    { value: "network administration", label: "Network Administration" },
    { value: "nursing", label: "Nursing" },
    { value: "operations management", label: "Operations Management" },
    { value: "pharmaceuticals", label: "Pharmaceuticals" },
    { value: "photography", label: "Photography" },
    { value: "product design", label: "Product Design" },
    { value: "product management", label: "Product Management" },
    { value: "project management", label: "Project Management" },
    { value: "public relations", label: "Public Relations" },
    { value: "quality assurance", label: "Quality Assurance" },
    { value: "real estate", label: "Real Estate" },
    { value: "renewable energy", label: "Renewable Energy" },
    { value: "research & development", label: "Research & Development" },
    { value: "retail management", label: "Retail Management" },
    { value: "robotics engineering", label: "Robotics Engineering" },
    { value: "sales", label: "Sales" },
    { value: "social media management", label: "Social Media Management" },
    { value: "software development", label: "Software Development" },
    { value: "supply chain management", label: "Supply Chain Management" },
    { value: "teaching", label: "Teaching" },
    { value: "technical writing", label: "Technical Writing" },
    { value: "telecommunications", label: "Telecommunications" },
    { value: "translation services", label: "Translation Services" },
    { value: "ui/ux design", label: "UI/UX Design" },
    { value: "urban planning", label: "Urban Planning" },
    { value: "video editing", label: "Video Editing" },
    { value: "web development", label: "Web Development" },
    { value: "workforce development", label: "Workforce Development" },
    { value: "writing & editing", label: "Writing & Editing" },
    { value: "zoology", label: "Zoology" },
  ];
  

  const handleChange = (event) => {
    setJob({
      ...job,
      category: event.target.value,
    })
    setCategory(event.target.value);
  };

  const handleDeleteTag = (deletedTag) => {
    setTags((prevTags) => prevTags.filter((tag) => tag[0] !== deletedTag[0]));
  };

  const addTag = (e) => {
    const newTags = e;

    setTags((prevTags) => {
      const updatedTags = [...prevTags];

      newTags.forEach((newTag) => {
        if (!updatedTags.some((tag) => tag[0] === newTag[0])) {
          updatedTags.push(newTag);
        }
      });

      return updatedTags;
    });
  };

  useEffect(() => {
    setJob((prevJob) => ({
      ...prevJob,
      skillsets: tags,
    }));
    // console.log(tags);
  }, [tags]);

  const [job, setJob] = useState(
    jobToEdit || {
      name: isAuth(),
      title: "",
      maxApplicants: "",
      maxPositions: "",
      salary: 0,
      deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
        .toISOString()
        .substr(0, 16),
      skillsets: [],
      duration: 0,
      jobType: "Full Time",
      location: "",
      status: "Open",
      description: "",
    }
  );

  var isComplete =
    job.title.length > 0 &&
    job.maxApplicants.length > 0 &&
    job.maxPositions.length > 0 &&
    job.salary.length > 0 &&
    job.deadline.length > 0 &&
    job.skillsets.length > 0 &&
    job.duration.length > 0 &&
    job.jobType.length > 0 &&
    job.location.length > 0 &&
    job.description.length > 0;

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ color: ["red", "blue"] }, { background: ["red", "blue"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const handleUpdate = () => {
    // console.log(job);
    axios
      .post(apiList.jobs, job, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJob({
          category: "",
          title: "",
          maxApplicants: "",
          maxPositions: "",
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "",
          duration: "",
          salary: "",
          description: "",
          location: "",
        });
        setPopup({
          open: true,
          icon: "success",
          message: "Post created successfully",
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="grid grid-cols-12 overflow-y-hidden h-screen mt-20">
      <div className="col-span-4 bg-light px-12 py-4 overflow-y-scroll">
        <FormControl fullWidth sx={{ marginTop: 5 }}>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            {categoryOptions.map((option, index) => (
              <MenuItem key={index} value={option.value.toLowerCase()}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputField
          className="mt-8"
          type="text"
          label="Job Title"
          value={job.title}
          onChange={(e) => {
            setJob({
              ...job,
              title: e.target.value,
            });
          }}
          placeholder="Title"
        />
        <InputField
          className="mt-8 hover:border-black"
          type="number"
          label="salary Reward"
          placeholder="..."
          value={job.salary}
          onChange={(e) => {
            setJob({
              ...job,
              salary: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="text"
          label="Job type"
          placeholder="25 000"
          value={job.jobType}
          onChange={(e) => {
            setJob({
              ...job,
              jobType: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="text"
          label="duration"
          placeholder="25 000"
          value={job.duration}
          onChange={(e) => {
            setJob({
              ...job,
              duration: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="datetime-local"
          label="Application Deadline"
          placeholder="dd/mm/yy"
          value={job.deadline}
          onChange={(e) => {
            setJob({
              ...job,
              deadline: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="number"
          label="Maximum Number Of Applicants"
          placeholder="100"
          value={job.maxApplicants}
          onChange={(e) => {
            setJob({
              ...job,
              maxApplicants: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="text"
          label="location"
          placeholder="25 000"
          value={job.location}
          onChange={(e) => {
            setJob({
              ...job,
              location: e.target.value,
            });
          }}
        />
        <InputField
          className="mt-8 hover:border-black"
          type="number"
          label="Positions Available"
          placeholder="20"
          value={job.maxPositions}
          onChange={(e) => {
            setJob({
              ...job,
              maxPositions: e.target.value,
            });
          }}
        />
        <div className="pb-4">
          <label className="block text-black text-sm font-semibold mb-2">
            Skills <span className="text-[#ff3131]">*</span>
          </label>
          <MuiChipsInput
            value={tags}
            onChange={(e) => {
              addTag(e);
            }}
            className="bg-white w-full block border border-grey-light p-3 rounded mb-4"
            onDeleteChip={(deletedTag) => handleDeleteTag(deletedTag)}
          />
        </div>
        <label className="block text-sm font-medium text-gray-700 mt-6 mb-2">
          Job description
        </label>
        <tr>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={job.description}
            onChange={(e) => {
              setJob({
                ...job,
                description: e,
              });
            }}
            placeholder="Job description goes here..."
          />
        </tr>
        <div className="flex items-center pt-6 gap-5">
          {isComplete ? (
            <Button
              onClick={() => handleUpdate()}
              variant="contained"
            >
              Save
            </Button>
          ) : (
            <Button disabled WaitingBtn>Waiting for responses</Button>
          )}
          <Link
            to="/admin"
          >
            <Button variant="outlined">Cancel</Button>
          </Link>
        </div>
      </div>
      <div className="col-span-8 overflow-y-scroll">
        <JobAd job={job} tags={tags} />
      </div>
    </div>
  );
}
