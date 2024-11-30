import React, { useState } from "react";
import { Tabs, Tab, Box, IconButton, Drawer, useMediaQuery } from "@mui/material";
import { MailOutline, Assessment, WorkOutline, Settings, Menu } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import Applicant from "./applicant";
import Recruiter from "./recruiter";
import Job from "./Job";
import Notification from "./notification";

export function Dashboard() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0); // Sidebar tab state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle
  const isMobile = useMediaQuery("(max-width: 768px)"); // Responsive breakpoint

  // Handle Sidebar Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (isMobile) {
      setIsSidebarOpen(false); // Close sidebar on mobile after selection
    }
  };

  // Toggle Sidebar for Mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Sidebar Tabs Component
  const SidebarTabs = () => (
    <Tabs
      orientation="vertical"
      value={activeTab}
      onChange={handleTabChange}
      className="w-full"
      TabIndicatorProps={{ style: { backgroundColor: "#3b82f6" } }}
    >
      <Tab icon={<WorkOutline />} label="Dashboard" />
      <Tab icon={<MailOutline />} label="Find Job" />
      <Tab icon={<Assessment />} label="Applicant" />
      <Tab icon={<Assessment />} label="Recruiter" />
      <Tab icon={<Assessment />} label="Resume Service" />
      <Tab icon={<Settings />} label="Settings" />
    </Tabs>
  );

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col mt-28">
      {/* Header */}
      <div className="bg-white shadow px-4 py-3 flex flex-row items-center">
        <h1 className="flex justify-center text-lg md:text-2xl font-semibold text-gray-800">
          Welcome back! Ready to manage your dashboard?
        </h1>
        <IconButton className="md:hidden" onClick={toggleSidebar}>
          <Menu fontSize="large" />
        </IconButton>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        {isMobile ? (
          <Drawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            className="md:hidden"
          >
            <Box className="bg-white w-64 min-h-screen">
              <SidebarTabs />
            </Box>
          </Drawer>
        ) : (
          <Box className="hidden md:block bg-white w-64 border-r border-gray-200">
            <SidebarTabs />
          </Box>
        )}

        {/* Main Content */}
        <Box className="p-6 flex-1 bg-gray-100">
          {activeTab === 0 && <div>Dashboard Content</div>}
          {activeTab === 1 && <Job id={id} />}
          {activeTab === 2 && <Applicant id={id} />}
          {activeTab === 3 && <Recruiter id={id} />}
          {activeTab === 4 && <div><Notification/></div>}
          {activeTab === 5 && <div>Settings Content</div>}
        </Box>
      </div>
    </div>
  );
}
