import React, { useState } from "react";
import axios from 'axios';
import { load } from "@cashfreepayments/cashfree-js";
import FAQ from "components/FAQ";
import icon from "assets/images/human-rewritten-resume-section.png";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Button } from "@mui/material";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import  apiList from "libs/apiList";
import { toast } from "react-toastify";
import { BiSolidBadgeCheck } from "react-icons/bi";
import { BiSolidUserCheck } from "react-icons/bi";
import { RiUserStarLine } from "react-icons/ri";
import SuccessModal from "components/alert/successModal";

export default function ResumeService() {
 
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [price, setPrice] = useState(11);
  let cashfree;
  var initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox"
    });
  }
  initializeSDK();

  const verifyPayment = async (verifydata) => {
    const { orderId } = verifydata;
    try {
      const response = await axios.post(`${apiList.verifyPayment}`, {
        orderId: orderId,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const paymentStatus = response.data.map((item) =>(item.payment_status));
     
      // console.log("Verification result:", paymentStatus[0]);
  
      if (paymentStatus[0] === "SUCCESS") {
        // toast.success("Payment verified successfully!");
        handleOpen();
      } else {
        toast.error("Payment verification failed!");
      }
    } catch (error) {
      console.error("Error during verification:", error);
      toast.warn("Unable to verify payment. Please try again.");
    }
  };
  
  const doPayment = async () => {

    try {
      // const {data} = await axios.post('http://localhost:8000/create-payment-session', {price});
      // const { data } = await axios.post(`${apiList.payment}`, { price });
      // window.open(data.payment_link);
      const {data} = await axios.post(`${apiList.payment}`, {price});
      // console.log(data.payment_session_id);
      let checkoutOptions = {
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_modal",
      }
      const result = await cashfree.checkout(checkoutOptions);

      if (result.error) { 
        toast.error("User has closed the popup or there is some payment error, Check for Payment Status");
      }
      
      if (result.redirect) {        
        toast.warn("Payment will be redirected");
        let orderid = data.orderId;
        let verifydata = {
          orderId : orderid,
        }
        verifyPayment(verifydata);
      }

      if (result.paymentDetails) {

        let orderid = data.orderId;
        let verifydata = {
          orderId : orderid,
        }
        // console.log("Payment has been completed, Check for Payment Status");
        verifyPayment(verifydata);
      }
    } catch (err) {
      toast.error('Server error');
    }

  };

  return (
    <>
      <div
        className="flex flex-col items-center bg-white md:pt-32 pt-24 min-h-[800px]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(248, 229, 212, 0.6)), url('/img/ResumeService.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <h1 className="max-w-6xl mx-auto text-center md:text-6xl text-4xl font-bold text-gray-800 pt-10">
          Unlock the Door to Your Dream Job with Our Professional Resume Service
        </h1>
        <p className="max-w-6xl mx-auto text-center md:text-xl text-xl font-bold text-gray-600 pt-10">
          <span className="text-blue-400">Not getting noticed in your job search?</span> Often resumes are missing essential keywords or the right formatting for ATS and hiring managers. <span className="text-blue-400">Don't make this mistake!</span> Don’t worry, Minerva is here! Ensure your resume stands out with the personal touch of our human rewritten resume. <span className="text-blue-400">Transform your job search: Get noticed, get called, get hired.</span>
        </p>
        <div className="pt-10">
          <Button variant="contained" size="large" href="#buynow">
            Revamp My Resume
          </Button>
        </div>
      </div>

      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto  bg-gray-200">
        <div className="grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-0 mt-0 mx-auto flex flex-row items-center">
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center pt-10">
            <h1 className="mx-auto md:text-left text-center md:text-4xl text-4xl font-bold text-gray-800">
              Get noticed, Get called, Get hired with a Professional Human Rewritten Resume!
            </h1>
            <p className="text-2xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0 mb-12">
              At Ladders, we understand the intricacies of ATS algorithms and design your resume to not only get noticed but to stand out.<br />
              Our professional resume crafting includes:
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row items-center pb-5 space-x-2">
                <BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" />
                <p className="text-xl mx-auto md:text-left text-center md:pr-16 pr-0">
                  {" "} <strong className="text-gray-800">ATS Optimization</strong> - Tailored to meet specific job titles you’re interested in with the right keywords and formatting.
                </p>
              </div>
              <div className="flex flex-row items-center pb-5 space-x-2">
                <BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" />
                <p className="text-xl mx-auto md:text-left text-center md:pr-16 pr-0">
                  {" "} <strong className="text-gray-800">Strategic Structuring</strong> - Organized to highlight your strongest assets and make a compelling case to hiring managers.
                </p>
              </div>
              <div className="flex flex-row items-center space-x-2">
                <BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" />
                <p className="text-xl mx-auto md:text-left text-center md:pr-16 pr-0">
                  {" "} <strong className="text-gray-800">Personalized Touch</strong> - Each resume is infused with your unique professional narrative, ensuring it resonates with both bots and humans alike.
                </p>
              </div>
            </div>
            <div className="pt-10">
              <div className="pt-10">
                <Button variant="contained" size="large" href="#buynow">Revamp My resume</Button>
              </div>
            </div>
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl pl-20 pt-10"
            src={icon}
          />
        </div>
      </div>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-gray-800 text-2xl md:text-5xl font-semibold">How It Works</h1>
        <div
          className="grid lg:grid-cols-3 grid-cols-1 gap-14 md:py-32 py-12
          md:text-left text-center md:w-10/12 w-11/12 mx-auto"
        >
          <div className="border border-2 border-blue-300 rounded-lg p-8 bg-gray-200/50">
            <FaCloudUploadAlt
              className="text-5xl mb-6 text-indigo-500"
              icon={faSearch}
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 1:
            </div>
            <h1 className="text-3xl text-blue-900 pb-3 font-semibold">
              Upload Your Resume
            </h1>
            <p className="text-xl font-light">
              Start by uploading your current resume.
            </p>
          </div>
          <div className="border border-2 border-yellow-300 rounded-lg p-8 bg-gray-200/50">
            <BiSolidUserCheck
              className="text-5xl mb-6 text-yellow-600"
            />
            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 2:
            </div>
            <h1 className="text-3xl text-yellow-600 pb-3  font-semibold">
              Confirm your job experience
            </h1>
            <p className="text-xl font-light">Briefly confirm your job history, skills, career achievements and experience.</p>
          </div>
          <div className="border border-2 border-green-300 rounded-lg p-8 bg-gray-200/50">
            <RiUserStarLine
              className="text-5xl mb-6 text-green-500"
            />

            <div className="text-gray-900 text-md tracking-wide pb-2 uppercase font-semibold">
              Step 3:
            </div>
            <h1 className="text-3xl  text-green-600 pb-3 font-semibold">
              Review your new resume
            </h1>
            <p className="text-xl font-light">
              Get a professionally tailored resume that showcases your best self.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200  flex flex-col justify-center items-center py-10 px-4" id="buynow">
        <div className="text-center mb-8 md:pt-20">
          <h1 className="text-3xl  md:text-5xl md:pb-20 font-bold text-gray-800">Compare our products and find yours</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-8 md:pb-20 pb-10">
          {/* Professional Resume Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-80 lg:w-96">
            <h2 className="text-xl font-bold md:text-2xl text-gray-700">Professional Resume</h2>
            <p className="mt-4 text-gray-600">
              Transform your resume with expert intervention. Our professional writers will refine your resume to showcase your achievements and attract top employers.
            </p>
            <div className="mt-6 mb-4">
              <p className="text-gray-700"><strong>Premium Ladders Members:</strong> ₹11</p>
            </div>
            <Button variant="contained" fullWidth onClick={doPayment} >Buy Now</Button>
            {/* <Button variant="contained" fullWidth onClick={handleOpen} >Buy Now</Button> */}
            <SuccessModal open={open} handleClose={handleClose} />
            <ul className="mt-4 text-left text-gray-700">
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> ATS-Friendly</li>
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> Standard Format Preferred by Recruiters</li>
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> Optimized with Keywords</li>
            </ul>
          </div>
          {/* Professional Bundle Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-80 lg:w-96 border border-blue-400 relative">
            <div className="absolute top-4 right-4 bg-yellow-400 text-white text-sm px-2 py-1 rounded">POPULAR</div>
            <h2 className="text-xl font-bold">Professional Bundle</h2>
            <p className="mt-4 text-gray-600">
              Elevate your professional toolkit with a Human Revised Resume, Cover Letter, and LinkedIn optimization guide.
            </p>
            <div className="mt-6 mb-4">
              <p className="text-gray-700"><strong>Premium Ladders Members:</strong> ₹25</p>
              <p className="text-gray-700"><strong>Basic Members:</strong> ₹15</p>
            </div>
            <Button variant="contained" fullWidth color="inherit">Buy Now</Button>
            <ul className="mt-4 text-left text-gray-700">
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> Human Rewritten Resume</li>
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> Customizable Cover Letter</li>
              <li className="flex flex-row"><BiSolidBadgeCheck className="text-blue-500 text-5xl pb-5" /> LinkedIn Profile Optimization</li>
            </ul>
          </div>
        </div>
      </div>
      <FAQ
        questionOne="What advantages does a Professional Resume have over an AI-optimized one?"
        answerOne="Our Professional Resume provides a personalized human touch, with experienced resume writers who understand nuanced career narratives and can craft a resume that not only passes ATS checks but also resonates emotionally with recruiters."
        questionTwo="How do I work with my resume writer?"
        answerTwo="After you complete your order, we assign a professional resume writer who specializes in your industry and career level. During the onboarding process, you'll be asked some questions to gather all the necessary information, which will then be passed on to the writer. 
        Once the rewrite is complete, you will receive a notification via email containing a link to download your newly improved resume."
        questionThree="How long does the whole process take?"
        answerThree=" The process typically takes 2 - 3 business days, depending on the complexity of your career history and industry."
        questionFour="Do you provide industry-specific resume services?"
        answerFour=" Yes, our team includes writers who specialize in various industries, ensuring that your resume is not only well-written but also tailored to the specifics of your field."
        questionFive="How often should I update my resume?"
        answerFive="We recommend updating your resume whenever you gain new skills or experiences, or at least annually to ensure it reflects the most current version of your professional journey."
      />
    </>
  );
}
