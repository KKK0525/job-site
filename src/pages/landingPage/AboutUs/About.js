import React, { useState } from "react";
import bg1 from "assets/About/bg-1.jpg";
import bg2 from "assets/About/bg-2.jpg";
import bg3 from "assets/About/bg-3.jpg";

const AboutSection = () => {

  return (
    <>
      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="flex flex-col items-center justify-center text-center md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-6 col-span-1 mt-0  text-center pt-32">
            <h1 className="mx-auto  text-center md:text-4xl text-4xl font-bold text-sky-900">
              About Our Company
            </h1>
            <p className="text-gray-800 text-xl mx-auto md:text-left text-center pt-4 md:pr-16 pr-0 mb-12">
              We are a trusted name in bridging the gap between ambitious candidates and their dream careers.
            </p>
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl lg:w-3/4 h-auto object-contain"
            src={bg1}
          />
        </div>
      </div>
      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center pt-10">
            <h1 className="mx-auto md:text-left text-center md:text-4xl text-4xl font-bold text-sky-900">
              Our Mission: Excellence in Service
            </h1>
            <div className="text-xl mx-auto md:text-left text-center  pt-4 md:pr-16 pr-0 mb-12">
              <h6 className="font-bold text-gray-600 mb-3">Quality Over Quantity:</h6>
              <p className="text-gray-600">At Minerva, we prioritize the quality of our placements over sheer numbers. We seek to connect highly skilled and ambitious individuals with roles that truly match their potential.</p>

              <h6 className="font-bold text-gray-600 mb-3 mt-3">Collective Success:</h6>
              <p className="text-gray-600">Our mission is to work towards the collective goals of our clients and candidates. We believe in a future where every placement is a step towards shared success.</p>
            </div>
          </div>
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl"
            src={bg2}
          />
        </div>
      </div>
      <div className="bg-white md:pt-0 mt-20 mb-20 md:w-10/12 w-11/12 mx-auto">
        <div className="grid lg:grid-cols-12 md:gap-6 gap-24 grid-cols-1 md:mt-20 mt-0 mx-auto">
          <img
            alt="pricing example chart"
            className="md:col-span-6 col-span-1 rounded-xl"
            src={bg3}
          />
          <div className="md:col-span-6 col-span-1 mt-0 md:text-left text-center ml-10 pt-10">
            <h1 className="mx-auto md:text-left text-center md:text-4xl text-4xl font-bold text-sky-900">
              Our Vision: Growing Together
            </h1>
            <div className="text-xl mx-auto md:text-left text-center  pt-4 md:pr-16 pr-0 mb-12">
              <h6 className="font-bold text-gray-600 mb-3">Organic Growth and Team Building:</h6>
              <p className="text-gray-600">We envision a future where Minerva grows hand-in-hand with our team and clients. Our goal is to expand organically, nurturing a team that's as dedicated and loyal as it is skilled and innovative.</p>

              <h6 className="font-bold text-gray-600 mb-3 mt-3">Creating Lasting Connections:</h6>
              <p className="text-gray-600">We're more than a recruitment firm; we're a hub of trusted connections. Our aim is to build long-term relationships that foster mutual growth and success.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );


};

export default AboutSection;
