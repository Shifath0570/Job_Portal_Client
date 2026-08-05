import Image from "next/image";
import Banner from "./Components/Banner";
import TrustedCompanies from "./Components/TrustedCompanies";
import PopularCategories from "./Components/PopularCategories";
import FeaturedJobs from "./Components/FeaturedJobs";
import TopCompanies from "./Components/TopCompanies";
import HowItWorks from "./Components/HowItWorks";
import Testimonials from "./Components/Testimonials";
import LatestBlogs from "./Components/LatestBlogs";
import Newsletter from "./Components/Newsletter";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <TrustedCompanies></TrustedCompanies>
      <PopularCategories></PopularCategories>
      <FeaturedJobs></FeaturedJobs>
      <TopCompanies></TopCompanies>
      <HowItWorks></HowItWorks>
      <Testimonials></Testimonials>
      <LatestBlogs></LatestBlogs>
      <Newsletter></Newsletter>
    </div>
  );
}
