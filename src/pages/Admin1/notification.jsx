import React from "react";
import { Card, CardContent, Typography, Avatar, IconButton } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";

const App = () => {
  const messages = [
    { id: 1, name: "Justin Rhyss", message: "Do you want to go see a movie tonight?", time: "now", profilePic: "https://via.placeholder.com/40" },
    { id: 2, name: "Justin Rhyss", message: "Do you want to go see a movie tonight?", time: "now", profilePic: "https://via.placeholder.com/40" },
    { id: 3, name: "Justin Rhyss", message: "Do you want to go see a movie tonight?", time: "now", profilePic: "https://via.placeholder.com/40" },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 p-4 font-sans">
      {/* Left Column: Messages */}
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6" className="font-bold">
            Messages
          </Typography>
          <button className="text-blue-500 text-sm">Filters</button>
        </div>
        {messages.map((message) => (
          <Card key={message.id} className="mb-4 shadow-sm">
            <CardContent className="flex items-center">
              <Avatar src={message.profilePic} alt={message.name} className="mr-4" />
              <div className="flex-1">
                <Typography variant="subtitle1" className="font-bold">
                  {message.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {message.message}
                </Typography>
              </div>
              <Typography variant="caption" className="mr-4 text-gray-500">
                {message.time}
              </Typography>
              <IconButton>
                <ArrowForward />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Right Column: Profile Details */}
      <div className="col-span-1 bg-white p-4 rounded-lg shadow">
        <Typography variant="h6" className="font-bold mb-2">
          Senior UI/UX Designer
        </Typography>
        <Typography variant="body2" color="textSecondary" className="mb-4">
          Google, Inc
        </Typography>
        <img src="https://via.placeholder.com/100x40" alt="Google Logo" className="mb-4" />
        <Typography variant="subtitle2" className="font-bold mb-2">
          Qualification:
        </Typography>
        <ul className="list-disc pl-5 text-sm text-gray-700 mb-4">
          <li>A bachelor's degree and 1 year experience.</li>
          <li>A portfolio of professional UI/UX design work for both web and mobile platforms.</li>
          <li>Excellent written and verbal communication skills.</li>
          <li>Multi-tasking and time-management skills, with the ability to prioritize tasks.</li>
        </ul>
        <Typography variant="subtitle2" className="font-bold mb-2">
          Responsibilities & Duties:
        </Typography>
        <ul className="list-disc pl-5 text-sm text-gray-700">
          <li>Illustrate design ideas using storyboards, process flows, and sitemaps.</li>
          <li>Develop UI mockups and prototypes that clearly illustrate how sites function and look.</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
