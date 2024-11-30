import { useEffect, useState } from "react";
import InputField from "components/InputField";
import apiList from "../../libs/apiList";
import apiUploadImages from "../../libs/uploadImage";
import { userType } from "libs/isAuth";
import { Button } from "@mui/material";

export default function AccountSettings({ user, profile }) {
  const type = userType();
  const [email, setEmail] = useState(user?.email);

  async function handleEmailUpdate() {
    if (type === "greeter") {
      return;
    }
  }

  return (
    <div className="mt-16 md:mt-0 p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-medium text-gray-900">Account Settings</h3>
      <p className="mt-2 text-sm text-gray-600">Change to a new email.</p>

      {/* Email Input */}
      <div className="mt-6">
        <InputField
          className="w-full md:w-1/2"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="firstname@company.com"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          variant="contained"
          size="large"
          onClick={() => handleEmailUpdate()}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => setEmail(user?.email)}
        >
          Cancel
        </Button>
      </div>
    </div>

  );
}
