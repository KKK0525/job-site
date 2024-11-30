import { Link } from "react-router-dom";
import { SiIconfinder } from "react-icons/si";
import { Slide } from "react-awesome-reveal";
import { Button } from "@mui/material";
import { HiClipboardDocument } from "react-icons/hi2";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSwimmer, faTh, } from "@fortawesome/free-solid-svg-icons";
import { Dialog, Transition } from "@headlessui/react";
import { userType } from "libs/isAuth";

export default function Jumbotron() {
  let [isOpen, setIsOpen] = useState(false);
  const type = userType();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {type === "recruiter" ? (
        <main
          className="bg-gray-100"
          style={{
            backgroundImage:
              "linear-gradient(rgba(210, 213, 215, 0.8), rgba(207, 207, 207, 0.6)), url('/img/recruiter.png')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "inherit",
            backgroundPosition: "right",
          }}
        >
          <div className="w-11/12 flex flex-wrap mx-auto pt-20 lg:pt-32 pb-16 lg:pb-40">
            <div className="lg:text-left text-center lg:w-7/12 w-full lg:pt-24 pt-12 mx-auto">
              <h1 className="text-gray-800 lg:text-6xl text-3xl font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Welcome to Recruiter Home
              </h1>
              <p className="mt-3 text-xl text-black sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                With profound knowledge in the JOB field and specialized skills, we can
                assist you in accessing and recruiting the best candidates.
              </p>
              <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link onClick={() => openModal()}>
                  <Button variant="contained" size="large">
                    See Companies Board
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : type === "applicant" ? (
        <main className="bg-gray-200" style={{
          backgroundImage: "linear-gradient(rgba(210, 213, 215, 0.8), rgba(207, 207, 207, 0.6)), url('/img/applicants.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "inherit",
          backgroundPosition: "right"
        }}>
          <div className="w-11/12 flex flex-wrap mx-auto pt-20">
            <div className="lg:text-left text-center lg:w-7/12 w-12/12 lg:pt-24 pt-12 lg:pb-40 pb-16 mx-auto">
              <h1 className="text-gray-800 lg:text-6xl text-4xl sm:mt-5 font-bold sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Welcome to Applicant home
                <br />
              </h1>
              <p className="mt-3 text-xl text-gray-800 sm:mt-5 sm:max-w-xl sm:mx-auto md:mt-5 lg:mx-0">
                Greet let's you introduce your friend to their dream job in
                tech. As a reward, you get paid if they get interviewed or
                hired.
              </p>
              <div className="mt-4 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <Link
                  onClick={() => openModal()}
                >
                  <Button variant="contained" size="large">
                    See job board
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="min-h-screen flex flex-col items-center text-center" style={{
          backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.8), rgba(248, 229, 212, 0.6)), url('/img/bg-1.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition:"top",
        }}>
          <div className="text-center lg:w-7/12 w-12/12 ld:pt-52 md:pt-40 pt-32 pb-52 mx-auto h-2/3">
            <Slide direction="left">
              <h1 className="text-neutral-700 md:text-6xl text-3xl md:w-11/12 w-12/12 mx-auto sm:mt-5 font-bold md:mt-5 px-5 md:pt-20 pt-10">
                Find Your <spane className="text-blue-500">Dream job</spane> & Grow Your Professional Carrier
              </h1>
            </Slide>
            <Slide direction="right">
              <p className="text-neutral-700 mt-3 md:text-3xl  text-2xl sm:mt-5 md:mt-5 w-11/12 mx-auto">
                Get the job you want by researching employers, using the right keywords to filter job search results and Improving your networking skills
              </p>
            </Slide>
            <Slide direction="up">
              <div className="flex flex-col items-center text-center justify-center md:flex-row md:items-center mt-8 sm:mt-12 mx-auto gap-16">
                <button
                  onClick={() => openModal()}
                  className="transition duration-500 hover:bg-[#0c4eb1] md:mx-0  text-white shadow font-semibold rounded-full items-center justify-center py-3 border border-transparent text-base  bg-[#267bfa] md:py-4 md:text-lg px-8"
                >
                  Search for a job
                </button>

                <Link
                  to="/sign-up"
                  className="transition duration-500 md:mx-0 text-white font-semibold rounded-full items-center justify-center py-3  hover:bg-[#276404] hover:text-white  text-base  bg-[#379202] md:py-4 md:text-lg px-8"
                >
                  Get Started
                </Link>
              </div>
            </Slide>
          </div>
        </main>
      )}

      {type === "applicant" ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
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
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    Search for a favorite job
                  </h1>
                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/jobs"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-blue-500 rounded-full sm:h-12 sm:w-12">
                        <HiClipboardDocument className="text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the job board
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/for-applicant"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-blue-500 rounded-full sm:h-12 sm:w-12">
                        <SiIconfinder className="text-white" />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          For applicant
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : type === "recruiter" ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
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
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    See recruiter board
                  </h1>
                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/for-recruiter"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-white bg-blue-500 rounded-full sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faTh} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          For recruiter
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/companies"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-white bg-blue-500 rounded-full sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faSwimmer} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the Recruiter board
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child>
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
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
                <div className="inline-block w-full max-w-lg md:p-6 p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <h1 className="text-center text-3xl font-semibold">
                    Choose to see
                  </h1>
                  <p className="text-center text-lg">
                    Select the recruiter board to view employers or the job
                    board to see available jobs.
                  </p>

                  <div className="relative bg-white p-2 mt-6">
                    <Link
                      to="/jobs"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faTh} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the job board
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/companies"
                      className="border-2 border-gray-200 flex items-center text-left p-3 mx-1 my-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                    >
                      <div className="flex items-center text-2xl justify-center flex-shrink-0 w-10 h-10 text-secondary bg-primary rounded-lg sm:h-12 sm:w-12">
                        <FontAwesomeIcon icon={faSwimmer} />
                      </div>
                      <div className="ml-4">
                        <p className="text-lg font-semibold text-gray-900">
                          Browse the companies board
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
}
