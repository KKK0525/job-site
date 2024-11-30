import * as React from 'react';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userType, getId } from "libs/isAuth";
import apiList from "libs/apiList";
import logoadmin from "assets/logo_admin.jpg";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCogs, faPoll, faSwimmingPool, faCog, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip'; // Added Tooltip for better accessibility

export default function ProfileMenu() {
  const type = userType();
  const getUser = getId();
  const history = useNavigate();
  const [user, setUser] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    history("/logout");
  };

  useEffect(() => {
    axios.get(`${apiList.user}/${getUser}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.error("Error fetching user data: ", err.message);
      });
  }, [getUser]);

  return (
    <div>
      <Tooltip title="Profile Menu" arrow className='flex flex-row gap-1'>
        {user?.profile ? (
          <Avatar src={user.profile} alt="User Profile" />
        ) : type === "admin" ? (
          <Avatar src={logoadmin} alt="Admin Profile" />
        ) : (
          <Avatar>{user?.name?.charAt(0)}</Avatar>
        )}
        <IconButton onClick={handleClick} edge="end" color="inherit">
          <FontAwesomeIcon icon={faCaretDown} />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 220, // Slightly wider for a more spacious feel
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f7f7f7", // Light background for a soft look
          },
        }}
      >
        {/* User Info Section */}
        <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 600, color: '#333' }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" style={{ marginTop: '5px' }}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Typography>
        </div>

        <Divider />

        {/* Menu Items Based on User Type */}
        {type === "applicant" && (
          <div>
            <MenuItem component={Link} to="/referrals">
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: 8 }} />
              My Referrals
            </MenuItem>
            <MenuItem component={Link} to="/applicant/settings">
              <FontAwesomeIcon icon={faCogs} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
          </div>
        )}

        {type === "recruiter" && (
          <div>
            <MenuItem component={Link} to="/admin">
              <FontAwesomeIcon icon={faPoll} style={{ marginRight: 8 }} />
              My Jobs
            </MenuItem>
            <MenuItem component={Link}>
              <FontAwesomeIcon icon={faSwimmingPool} style={{ marginRight: 8 }} />
              Talent Pool
            </MenuItem>
            <MenuItem component={Link} to="/admin/settings">
              <FontAwesomeIcon icon={faCog} style={{ marginRight: 8 }} />
              Settings
            </MenuItem>
          </div>
        )}

        {type === "admin" && (
          <div>
            <MenuItem component={Link} to="/dashboard">
              <FontAwesomeIcon icon={faSwimmingPool} style={{ marginRight: 8 }} />
              Dashboard
            </MenuItem>
          </div>
        )}

        <Divider />

        {/* Logout */}
        <MenuItem onClick={logout}>
          <FontAwesomeIcon icon={faCog} style={{ marginRight: 8 }} />
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
