import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import React, { useContext, useEffect, useState } from "react";
import RecruiterCard from "./RecruiterCard";
import { Pagination, Box } from "@mui/material";

export default function Recruiter() {

  const setPopup = useContext(SetPopupContext);
  const [all, setAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [selectedPage, setSelectedPage] = useState(1);


  useEffect(() => {
    const user = apiList.allRecruiter;
    axios
      .get(user)
      .then((response) => {
        // console.log(response.data.allUser);
        setAll(response.data.allUser);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          icon: "error",
          message: "Error",
        });
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = all.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
  };

  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const handlePageChange = (event, page) => {
  //   onPageChange(page); // Call the pagination function passed as a prop
  // };

  return (
    <div className="pt-10">
      <div className="pb-4">
        <span className="font-semibold text-slate-500">ALL RECRUITER</span>
        <span className="font-bold">({all.length})</span>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-2 gap-4">
          {currentItems.map((recruiter, index) => (
            // <div key={index} className="flex items-center bg-white rounded-md">
            //   <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
            //     <img
            //       src={`${recruiter.profile}`}
            //       alt={`${recruiter.name}'s profile`}
            //       className="w-[10rem] h-[10rem] rounded-xl"
            //     />
            //   </div>
            //   <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
            //     <div>
            //       <Typography variant="h5">{recruiter.name}</Typography>
            //     </div>
            //     <div>
            //       bio :{" "}
            //       <span className="font-semibold whitespace-pre-wrap">
            //         {recruiter.bio}
            //       </span>
            //     </div>
            //   </div>
            //   <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex-1 w-[30rem]">
            //     <div className="text-bold">Number phone:</div>
            //     <span className="font-semibold">{recruiter.contactNumber}</span>
            //   </div>
            //   <hr className="my-8 border-gray-300" />
            // </div>
            <RecruiterCard key={recruiter.id} recruiter={recruiter} />

          ))}
        </div>
        <Box className="flex justify-center mt-4">
          <Pagination
            // count={totalPages}
            page={currentPage}
            // onChange={handlePageChange}
            color="primary"
            size="medium"
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="circular"
          />
        </Box>
      </div>
    </div>
  );
}
