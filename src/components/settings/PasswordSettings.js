import InputField from "components/InputField";
import { useState } from "react";
import { Button } from "@mui/material";

export default function PasswordSettings({ user }) {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <div className="my-16 p-6 bg-white rounded-xl shadow-lg md:mt-0">
      <h3 className="text-2xl font-medium text-gray-900">Password</h3>
      <p className="mt-2 text-sm text-gray-600">Change to a new password.</p>

      {/* New Password Input */}
      <div className="mt-6">
        <InputField
          className="w-full md:w-1/2"
          label="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your new password"
        />
      </div>

      {/* Confirm Password Input */}
      <div className="mt-6">
        <InputField
          className="w-full md:w-1/2"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Re-enter your new password"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-8">
        <Button
          variant="contained"
          size="large"
          // onClick={() => handlePasswordUpdate()}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => {
            setPassword("");
            setConfirmPassword("");
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
