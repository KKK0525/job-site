import React, { useEffect, useContext } from 'react';
import { Box, Button, Stepper, Step, StepLabel, Typography } from '@mui/material';
import ContactForm from './contactForm';
import SkillForm from './skillForm';
import ExperienceForm from './experienceForm';
import axios from 'axios';
import { SetPopupContext } from "App";
import apiList from "../../libs/apiList";
import { getId } from '../../libs/isAuth';

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [contact, setContact] = React.useState({});
  const [skills, setSkills] = React.useState({});
  const [myexperience, setMyexperience] = React.useState({});
  const setPopup = useContext(SetPopupContext);
  const myId = getId();

  const steps = ['Contact', 'Skills', 'Experience'];
  const stepComponents = [
    <ContactForm setContact={setContact} />,
    <SkillForm setSkills={setSkills} />,
    <ExperienceForm setMyexperience={setMyexperience} />,
  ];

  const isStepOptional = (step) => step === 1;
  const isStepSkipped = (step) => skipped.has(step);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Make the POST request on the final step
      const { address, email, mobile, } = contact;
      const { hobby, mySkills } = skills;
      const { experience } = myexperience;

      axios
        .post(
          `${apiList.resumeApplications}`,
          {
            userId: myId,
            address: address,
            email: email,
            mobile: mobile,           
            hobby: hobby,
            skills: mySkills,
            experience: experience,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          setPopup({
            open: true,
            icon: "success",
            message: response.data.message,
          });
        })
        .catch((err) => {
          const errorMessage = err.response?.data?.message || "An error occurred";
          setPopup({
            open: true,
            icon: "error",
            message: errorMessage,
          });
          console.error("Error details:", err); 
        });
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      alert("You can't skip a step that isn't optional.");
      return;
    }
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleReset = () => setActiveStep(0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box className="w-full max-w-[90%] sm:max-w-[1000px] bg-white shadow-lg p-6 rounded-lg" sx={{ boxShadow: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption" className="text-blue-500">
                  Optional
                </Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }} className="text-center font-semibold">
              All steps completed - you're finished!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset} variant="contained" className="bg-blue-500 hover:bg-blue-700 text-white">
                Reset
              </Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Box sx={{ mt: 2, mb: 1 }}>{stepComponents[activeStep]}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }} className="justify-between">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-800"
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} className="text-blue-500 hover:text-blue-700">
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                variant="contained"
                className="bg-blue-500 hover:bg-blue-700 text-white"
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
}
