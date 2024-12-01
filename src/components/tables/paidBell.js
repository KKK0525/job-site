import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { FaBell } from "react-icons/fa";
import Tooltip from '@mui/material/Tooltip';
import { FaBellSlash } from "react-icons/fa";
import { Typography } from "@material-tailwind/react";
import apiList from "libs/apiList";
import axios from "axios";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { FiPhone } from "react-icons/fi";

export default function PaidBell() {

  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [drawerView, setDrawerView] = React.useState([]);
  const [response, setResponse] = React.useState();
  const recruiterId = localStorage.getItem('id');
  const filerData = response?.filter(
    (item) =>
      recruiterId === item.recruiterId &&
      item.ispayment === true &&
      item.status === "applied"
  ) || [];
  const navigater = useNavigate()

  const dataCount = filerData.length;
  const [count, setCount] = React.useState(dataCount);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
    // setCount(0);
  };

  function handlelistItemClick(_id) {
    navigater(`/admin/${_id}`);
  }

  React.useEffect(() => {
    setCount(dataCount);
  }, [dataCount]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiList.applications}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response?.data.applications) {
          setResponse(response.data.applications);
        } else {
          console.warn("API response does not have 'all' field:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      setCount(0);
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const hello = () => {
    alert('hello')
  }

  function notificationsLabel(count) {
    if (count === 0) {
      return 'no notifications';
    }
    if (count > 99) {
      return 'more than 99 notifications';
    }
    return `${count} notifications`;
  }
  // Format the date
  const dateFormatChange = (dateChange) => {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(dateChange));
    return formattedDate;
  };
  
  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
        {filerData.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem
              alignItems="flex-start"
              sx={{
                padding: '16px',
                paddingBottom:'0px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.05)',
                  cursor: 'pointer',
                },
              }}
              onClick={() => handlelistItemClick(item.job._id)}
            >
              {/* Avatar */}
              <ListItemAvatar>
                <Avatar
                  alt={item.jobApplicant.name}
                  src={item.jobApplicant.profile}
                  sx={{ width: 48, height: 48 }}
                />
              </ListItemAvatar>

              {/* Content */}
              <Box sx={{ marginLeft: 2, flex: 1 }}>
                {/* Name and Rating */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: 'bold', color: 'text.primary', fontSize: '2rem' }}
                  >
                    {item.jobApplicant.name}
                  </Typography>
                  <Rating
                    name="read-only"
                    value={item.jobApplicant.rating}
                    readOnly
                    size="small"
                    sx={{ fontSize: '1rem' }}
                  />
                </Box>
                <div className='flex flex-row justify-between'>
                  {/* Job Title */}
                  <Typography
                    variant="h6"
                    className='text-blue-500'
                  >
                    {item.job.title}
                  </Typography>

                  {/* Date */}
                  <div className='text-sm flat-right'>
                    {dateFormatChange(item.dateOfApplication)}
                  </div>
                </div>
              </Box>
            </ListItem>
            <div className='flex flex-row items-center justify-between pt-0'>
              <div className="flex items-center ml-24 text-gray-700 gap-2">
                <FiPhone className="mr-2 text-blue-500" size={20} />
                <strong>{item.mobile}</strong>
              </div>
              <div align="right" className='flex items-center text-blue-500 pr-5 mt-0 mb-5'>
                <span className='mt-3'>view more</span>
              </div>
            </div>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  React.useEffect(() => {
    const fetchData = async () => {
      if (openDrawer === true) {
        try {
          const allResponses = [];
          // console.log(`this is filerData: `, filerData)
          for (const item of filerData) {
            let address = `${apiList.getIdApplicant}?userId=${item.userId}`;
            const res = await axios.get(address, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            allResponses.push(res);
            setDrawerView(allResponses);
            // console.log('this is all responses:', res);
          }
          // console.log('this is all setDrawerView:', drawerView);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchData();
  }, [])

  return (
    <React.Fragment>
      {count > 0 ? (
        <Tooltip title="Someone applied for a new job!">
          <IconButton
            id="long-button"
            size='large'
            aria-label={notificationsLabel(100)}
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={toggleDrawer(true)}
          >
            {count > 0 ? (
              <Badge badgeContent={count} color="secondary">
                <FaBell className='text-blue-500' />
              </Badge>) : (
              <Badge badgeContent={0} color="secondary">
                <FaBellSlash className='text-gray-400' />
              </Badge>
            )}
          </IconButton>
        </Tooltip>
      ) : (<Tooltip title="No Application">
        <IconButton
          id="long-button"
          size='large'
          aria-label={notificationsLabel(100)}
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
        >
          <Badge badgeContent={0} color="secondary">
            <FaBellSlash className='text-gray-400' />
          </Badge>
        </IconButton>
      </Tooltip>)}
      <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </React.Fragment>
  );
}
