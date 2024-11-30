import React, { useState, useEffect } from "react";
import dummy from "../assets/dummy.webp";
import logdum from "../assets/logdum.png";

const TestimonialSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      name: "John Doe",
      designation: "CEO, Company Name",
    },
    {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "John Doe",
        designation: "CEO, Company Name",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        name: "John Doe",
        designation: "CEO, Company Name",
      },
    // Add more testimonials as needed
  ];

  const TestimonialCard = ({ text, name, designation }) => (
    <div className="mt-5 rounded-2xl border border-gray-300 bg-white shadow-md p-10 w-full md:w-4/5">
      <div className="mb-4">
        <img src={logdum} alt="Company Logo" className="w-24" />
      </div>
      <p className="text-gray-700 font-light leading-7">{text}</p>
      <div className="flex items-center mt-5">
        <img src={dummy} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <div className="text-gray-800 font-semibold text-lg">{name}</div>
          <div className="text-gray-600 text-sm">{designation}</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`flex ${isMobile ? "flex-col items-center" : "justify-between"} bg-top py-16 px-10 bg-gray-100`} style={{
      backgroundImage:"	url('/img/bg-3.png')",
      backgroundRepeat:"no-repeat",
      backgroundSize:"cover"
    }} >
      {/* opacity: 0.5, linear-gradient(rgba(118, 204, 249, 0.2), rgba(58, 146, 246, 0.5)),  */}
      <div className="flex-1 max-w-full md:max-w-1/2 text-center justify-items-center">
        <div className="text-blue-600 text-lg uppercase font-semibold tracking-widest"> TESTIMONIAL</div>
        <div className="mt-4 text-4xl font-bold text-neutral-700 leading-tight">Hear what our clients say</div>
        <div className="pt-4 pr-20 pl-20 text-lg text-gray-700">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.
        </div>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
      {!isMobile && (
        <div className="flex-1 max-w-full md:max-w-1/2">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialSection;
