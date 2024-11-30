import Content from "components/content";
import HowItWorks from "components/HowItWorks";
import Banner from "components/Banner";
import Trusted from "components/Trusted";
import ExploreByCategory from "components/exploreCategory";
import JobBoard from "components/tesetjob/JobBoard";
import { userType } from "libs/isAuth";
import { CompanyBanner } from "components/CompanyBanner";
import AboutSection from "components/findjobSection";
import TestimonialSection from "components/TestimonialSection";

function Home() {
  return (
    <div>
      <Content />
      <Trusted />
      <HowItWorks />
      <ExploreByCategory />
      <AboutSection />
      <JobBoard title={false} />
      <TestimonialSection />
      <CompanyBanner type={userType} /> 
      <Banner
        title="Ready to apply job?"
        button="Explore the job board"
        link="/jobs"
        type={userType}
      />
    </div>
  );
}

export default Home;
