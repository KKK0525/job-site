import React from "react";
import { Card, Avatar, Typography, IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

const notifications = [
  {
    id: 1,
    title: "Justin Rhyss",
    message: "Do you want to go see a movie tonight?",
    avatar: "https://i.pravatar.cc/150?img=1", // Replace with an avatar URL
    time: "now",
  },
  {
    id: 2,
    title: "Emily Clark",
    message: "Let’s meet at 5 PM tomorrow.",
    avatar: "https://i.pravatar.cc/150?img=2",
    time: "2 min ago",
  },
  {
    id: 3,
    title: "Michael Brown",
    message: "Don’t forget the meeting at 3 PM.",
    avatar: "https://i.pravatar.cc/150?img=3",
    time: "10 min ago",
  },
];

function NotificationCard({ notification }) {
  return (
    <Card className="flex items-center justify-between p-4 shadow-sm rounded-lg bg-white hover:shadow-md transition-shadow mb-4">
      {/* Left Section: Icon and Details */}
      <div className="flex items-center">
        {/* App Icon or Profile Picture */}
        <Avatar
          src={notification.avatar}
          alt={notification.title}
          className="w-12 h-12"
          sx={{ width: 48, height: 48 }}
        />

        {/* Text Content */}
        <div className="ml-4">
          <Typography variant="subtitle1" className="font-semibold text-gray-800">
            {notification.title}
          </Typography>
          <Typography variant="body2" className="text-gray-600">
            {notification.message}
          </Typography>
          <Typography variant="caption" className="text-gray-400">
            {notification.time}
          </Typography>
        </div>
      </div>

      {/* Reply Icon */}
      <IconButton>
        <ReplyIcon sx={{ color: "#3b82f6" }} />
      </IconButton>
    </Card>
  );
}

function NotificationList() {
  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-100 min-h-screen">
      {notifications.map((notification) => (
        <NotificationCard key={notification.id} notification={notification} />
      ))}
    </div>
  );
}

export default NotificationList;
