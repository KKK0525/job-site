
import { Link } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";

export default function NoJobs() {
  return (
    <div className="text-center w-5/12 mx-auto my-56">
      <MdOutlineCreate className="text-6xl text-white" />
      <h1 className="text-2xl mt-4">No jobs</h1>
      <p className="mb-8">Get started by creating a new job.</p>
      <Link
        to="/create-new-job"
        className="hover:bg-green-700  w-44 cursor-pointer font-semibold text-md justify-center px-8 py-3 bg-green-500 rounded-xl text-white"
      >
        <MdOutlineCreate className="mr-3" />
        Create job
      </Link>
    </div>
  );
}
