import React, { useState, useEffect } from "react";
import apiList from "libs/apiList";
import { MdOutlineDesignServices } from "react-icons/md";
import { LiaConnectdevelop } from "react-icons/lia";
import { FcSalesPerformance } from "react-icons/fc";
import { SiGooglemarketingplatform } from "react-icons/si";
import { Link } from "react-router-dom";
import axios from "axios";

const CategoryCard = ({ icon, title, jobCount }) => (
    <div className="flex items-center text-center gap-8 p-6 w-64 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105 duration-300">
        <div className="text-blue-500 text-6xl">{icon}</div>
        <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-500 text-lg">{jobCount}</p>
        </div>
    </div>
);

const ExploreByCategory = () => {

    const [categories, setCategories] = useState([]); 
    const development = categories.filter((item)=>item.category ===`development`).length || 0;
    const design = categories.filter((item)=>item.category ===`design`).length || 0;
    const sales = categories.filter((item)=>item.category ===`sales`).length || 0;
    const marketing = categories.filter((item)=>item.category ===`marketing`).length || 0;

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const address = apiList.getJobCategory; 
            const response = await axios.get(address);
            setCategories(response.data); 
          } catch (err) {
            console.error("Error fetching categories:", err);
          }
        };

        fetchCategories();
      }, []);

    // const development = 98;
    // const design = 56;
    // const sales = 67;
    // const marketing = 76;

    return (
        <div className="flex flex-col items-center py-12 px-4 bg-gray-100">
            <div className="max-w-7xl w-full mx-auto text-center px-4 sm:px-8">
                <h1 className="text-black lg:text-6xl text-4xl font-bold text-stone-700">
                    Explore By <span className="text-blue-500">Category</span>
                </h1>
                <p className="mt-3 text-lg sm:text-xl text-black max-w-xl mx-auto leading-8 pt-6 text-stone-700">
                    With our cutting-edge technology and vast network of reputable employers, we provide a seamless and efficient platform for professionals to discover their dream positions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl w-full mt-10 mx-auto px-4">
                    <CategoryCard icon={<LiaConnectdevelop />} title="Development" jobCount={design > 1000 ? (`${development} +Jobs`) : (`${development} Jobs`)} />
                    <CategoryCard icon={<MdOutlineDesignServices />} title="Design" jobCount={design > 1000 ? (`${design} +Jobs`) : (`${design} Jobs`)} />
                    <CategoryCard icon={<FcSalesPerformance />} title="Sales" jobCount={design > 1000 ? (`${sales} +Jobs`) : (`${sales} Jobs`)} />
                    <CategoryCard icon={<SiGooglemarketingplatform />} title="Marketing" jobCount={design > 1000 ? (`${marketing} +Jobs`) : (`${marketing} Jobs`)} />
                </div>
            </div>
            <Link to="/jobs" className="mt-10">
                <button className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-full hover:bg-blue-600 transition-colors">
                    Explore More
                </button>
            </Link>
        </div>

    );
};

export default ExploreByCategory;
