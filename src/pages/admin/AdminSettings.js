import AccountSettings from "components/settings/AccountSettings";
import PasswordSettings from "components/settings/PasswordSettings";
import RecruiterSettings from "components/settings/RecruiterSettings";
import { useState } from "react";

export default function AdminSettings({ user }) {
  let [active, setActive] = useState(0);
  let [profile, setProfile] = useState();

  return (
    <>
      <div className="bg-gray-100 md:mt-20 mt-20 min-h-screen">
        <div className="grid grid-cols-12 py-16 lg:py-32 w-11/12 mx-auto gap-6 lg:gap-16">
          {/* Sidebar Navigation */}
          <div className="col-span-12 lg:col-span-3">
            <button
              className={`${active === 0 ? "bg-white shadow-md" : "bg-gray-100 text-gray-600"
                } w-full text-left font-semibold cursor-pointer px-6 py-3 rounded-lg block`}
              onClick={() => setActive(0)}
            >
              Edit Public Profile
            </button>
            <button
              className={`${active === 1 ? "bg-white shadow-md" : "bg-gray-100 text-gray-600"
                } w-full text-left font-semibold cursor-pointer px-6 py-3 rounded-lg block mt-4`}
              onClick={() => setActive(1)}
            >
              Account Settings
            </button>
            <button
              className={`${active === 2 ? "bg-white shadow-md" : "bg-gray-100 text-gray-600"
                } w-full text-left font-semibold cursor-pointer px-6 py-3 rounded-lg block mt-4`}
              onClick={() => setActive(2)}
            >
              Password
            </button>
          </div>

          {/* Content Section */}
          <div className="col-span-12 lg:col-span-7">
            {active === 0 ? (
              <RecruiterSettings user={user} profile={profile} />
            ) : active === 1 ? (
              <AccountSettings user={user} />
            ) : (
              <PasswordSettings user={user} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
