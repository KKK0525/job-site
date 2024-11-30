import React, { useState, useEffect } from "react";
import { Slide } from "react-awesome-reveal";
import pic1 from "../assets/pic_1.png";
import pic2 from "../assets/pic_2.png";
import pic3 from "../assets/pic_3.png";

const AboutSection = ({ order, title, description, link, background }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div
            className={`p-12 grid gap-8 ${isMobile ? "grid-cols-1" : "grid-cols-2"}`}
            style={{
                background: background ? background : "#fff",
            }}
        >
            <div className="flex flex-row space-x-4 ml-8">
                <Slide direction="up">
                    <div className="m-2">
                        <img src={pic1} alt="about" className="rounded-lg my-6" />
                    </div>
                </Slide>
                <Slide direction="down">
                    <div className="m-2">
                        <img src={pic2} alt="about" className="rounded-lg my-0" />
                    </div>
                </Slide>
                <Slide direction="up">
                    <div className="m-2">
                        <img src={pic3} alt="about" className="rounded-lg my-8" />
                    </div>
                </Slide>
            </div>
            <Slide direction="right">
                <div className="p-2 md:p-10 flex flex-col text-center justify-center">
                    <h1 className="text-5xl md:text-7xl text-[#0f172a] font-semibold mb-6 text-stone-700">
                        Finding your dream job is easy!
                    </h1>
                    <p className="text-[#475569] text-lg md:text-xl leading-8 mb-9 text-stone-700">
                        Established by a visionary passionate for nurturing talent and fostering professional growth across the globe, we've quickly become a trusted name in bridging the gap between ambitious candidates and their dream careers.
                    </p>
                    <h5 className="text-[#0f6af5] text-base font-medium leading-6 tracking-wide cursor-pointer">
                        Read More
                    </h5>
                </div>
            </Slide>
        </div>
    );
};

export default AboutSection;
