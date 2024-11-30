import { useContext, useEffect, useState } from "react";
import axios from "axios";
import apiList from "../libs/apiList";
import Recruiter from "./Recruiter";
import Loader from "./Loader";
import { SetPopupContext } from "App";
import { Pagination, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

export default function CompanyBoard() {
  const setPopup = useContext(SetPopupContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [companies, setCompanies] = useState([]); // assuming you are fetching companies
  const itemsPerPage = 8; // Adjust based on how many items you want per page

  // Handle Search Query Change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtered Companies based on Search Query
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Paginated Companies
  const paginatedCompanies = filteredCompanies.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle Pagination Change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let recruiter = apiList.allRecruiter;
    axios
      .get(recruiter)
      .then((response) => {
        setCompanies(response?.data.allUser);
        // console.log("companie:", response?.data.allUser);
      })
      .catch((err) => {
        console.log(err.message);
        setPopup({
          open: true,
          icon: "error",
          message: err.message,
        });
      });
  }, []);

  if (!companies) {
    return <Loader />;
  }

  return (
    <>
      <div className="bg-light">
        <div className="w-11/12 md:w-10/12 mx-auto h-full pb-12 md:pb-28">
          <div className="bg-blue-500 py-16 px-4">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 md:mb-8">
              Recruiter Profile - Connect with Top Talent
            </h1>
            <div className="flex flex-row justify-self-center w-8/12 text-center">
              <p className="text-xl text-gray-100 text-center">Explore detailed information about the recruiter and their job opportunities. Learn about the company's mission, the roles they're hiring for, and the benefits they offer. Get in touch with the recruiter to find your next career opportunity or to discuss potential collaborations.</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto flex justify-center mt-10 mb-2 px-4">
              <TextField
                // label="Search Recruiter"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full sm:w-80"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: '#555', // Label color
                  },
                }}
              />
            </div>
          </div>
          <div className="flex justify-self-end mb-8 mt-8">
            <Pagination
              count={Math.ceil(filteredCompanies.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              variant="outlined"
              shape="circular"
            />
          </div>

          {/* Recruiter Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {filteredCompanies.length > 0 ? (
              paginatedCompanies.map((company) => (
                <Recruiter recruiter={company} key={company.userId} />
              ))
            ) : (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredCompanies.length > itemsPerPage && (
            <div className="flex justify-center mt-8">
              <Pagination
                count={Math.ceil(filteredCompanies.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                variant="outlined"
                shape="circular"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
