import * as React from 'react';
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import img1 from "../assets/paymentmodal/job-seekers.png";
import img2 from "../assets/paymentmodal/section-3-resume-banner.png";
import img3 from "../assets/paymentmodal/upper-footerimg.svg";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PaymentModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ApplyandClose = () => {
    props.apply();
    handleClose();
  }

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        {props.hasAcceptedJob ? "Job accepted!" : "Apply"}
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        className='bg-blue-50'
      >
        <AppBar sx={{ position: 'relative' }} className="bg-blue-600">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" className="text-white text-2xl font-bold">
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="flex flex-col lg:flex-row justify-center items-center px-4 lg:px-0 space-y-4 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-1/3 flex justify-center mb-6">
            <img src={img1} alt="Success" className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-3xl h-auto" />
          </div>
          <div className='flex flex-col z-40 mr-5'>
            <div className="text-center px-4 lg:px-8">
              <Typography variant="h4" className="text-blue-900 mb-4">
                YOUR SUCCESS STARTS HERE
              </Typography>
              <Typography variant="h6" className="text-gray-600 mb-4">
                Boost your profile at just ₹11/$0.3
              </Typography>
            </div>
            <Typography variant="h6" className="text-gray-700 text-sm pt-10 lg:pt-20 mb-4">
              Over 40 categories
            </Typography>
            <Typography variant="h6" className="text-gray-700 text-sm mb-4">
              Get personal mentor & grow your professional career
            </Typography>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center mb-6">
            <img src={img2} alt="Success" className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl h-auto" />
          </div>
          <div className="w-full flex justify-center md:hidden">
            <img src={img3} alt="Footer" className="w-full h-auto" />
          </div>
        </div>
        <div className='flex flex-row items-center justify-center gap-3'>
          <Link to="/resume-service">
            <Button autoFocus variant='contained'>Go Resume Service</Button>
          </Link>
            <Button autoFocus variant="outlined"s
             onClick={ApplyandClose}>
              Easy Apply
            </Button>
        </div>
      </Dialog>
    </React.Fragment>
  );
}