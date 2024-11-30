

import { Dialog, Transition } from "@headlessui/react";
import { SetPopupContext } from "App";
import axios from "axios";
import apiList from "libs/apiList";
import { userType } from "libs/isAuth";
import ApplicantCard from "./ApplicantCard";
import { Search } from '@mui/icons-material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import unorm from "unorm";
import ApplicantPagiation from "./Pagination";
import { Divider, } from '@mui/material';

export default function Applicant() {
  const setPopup = useContext(SetPopupContext);
  const searchRef = useRef(null);
  const [all, setAll] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadContent, setReloadContent] = useState(false);
  const [placeholderText, setPlaceholderText] = useState("Type (/) search");
  const [salaryRange, setSalaryRange] = useState('');
  const [location, setLocation] = React.useState('');
  const [jobType, setJobType] = React.useState('');

  useEffect(() => {
    const user = apiList.allApplicants;
    const normalizeText = (text) => {
      return unorm
        .nfkd(text)
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
    };
    axios
      .get(user)
      .then((response) => {
        const newData = response.data.allUser.filter((user) => {
          const normalizedTitle = normalizeText(user.name);
          return normalizedTitle.includes(normalizeText(searchQuery));
        });
        setAll(newData);
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: "Error fetching applicants",
        });
      });
  }, [reloadContent, setPopup, searchQuery]);

  const openModal = (user) => {
    setIsOpen(true);
    setSelectedUser(user);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = all.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedPage(pageNumber);
    setSearchQuery(""); // Reset search query when paginating
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        if (searchRef.current) {
          searchRef.current.focus();
        }
      }
      if (event.key === "Escape") {
        setSearchQuery("");
        if (searchRef.current) {
          searchRef.current.blur();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (user) => {
    axios
      .delete(`${apiList.user}/${user}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          icon: "success",
          message: response.data.message,
        });
        setReloadContent(!reloadContent);
        setIsOpen(false);
      })
      .catch((err) => {
        setPopup({
          open: true,
          icon: "error",
          message: err.response.data.message,
        });
      });
  };

  return (
    <div className="min-h-screen flex flex-col pt-2 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center mb-4 flex-wrap sm:flex-nowrap gap-6 justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-slate-500">ALL APPLICANT</span>
          <span className="font-bold">({all.length})</span>
        </div>
        {/* Top-Pagination */}
        <div className="flex justify-center">
          <ApplicantPagiation
            all={all}
            itemsPerPage={itemsPerPage}
            selectedPage={selectedPage}
            paginate={paginate}
          />
        </div>
        <div className="flex w-full sm:w-auto mt-4 sm:mt-0 pr-4 sm:pr-20 items-center">
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
            </span>
            <input
              type="search"
              id="search"
              placeholder={placeholderText}
              className="block w-full p-3 pl-10 text-sm text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              aria-label="Search input"
              onFocus={() => setPlaceholderText("Search name or user")}
              onBlur={() => setPlaceholderText("Search")}
              onChange={handleSearchInputChange}
              ref={searchRef}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <Divider sx={{ marginBottom: 2 }} />

      {/* Applicant Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-2 gap-4">
        {currentItems.map((applicant, index) => (
          <ApplicantCard
            key={index}
            applicant={applicant}
            index={index}
            setSelectedUser={setSelectedUser}
            openModal={openModal}
          />
        ))}
      </div>

      {/* Divider */}
      <Divider sx={{ marginBottom: 2 }} />

      {/* Pagination */}
      <div className="flex justify-center mb-20">
        <ApplicantPagiation
          all={all}
          itemsPerPage={itemsPerPage}
          selectedPage={selectedPage}
          paginate={paginate}
        />
      </div>

      {/* Modal for Deletion Confirmation */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg sm:max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Are you sure?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this {selectedUser?.name}? All of the candidates that have been referred will be deleted as well.
                  </p>
                </div>
                <div className="mt-4 flex space-x-3">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-300 border border-transparent rounded-md hover:bg-red-400"
                    onClick={() => handleDelete(selectedUser?.userId)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
}
