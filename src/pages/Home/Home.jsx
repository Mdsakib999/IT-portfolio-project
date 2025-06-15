import HomeBanner from "../../components/HomePageComponents/HomeBanner";
import Impact from "../../components/HomePageComponents/Impact";
import IndustryExpertise from "../../components/HomePageComponents/IndustryExpertise";
import OurExpertise from "../../components/HomePageComponents/OurExpertise";
import Work from "../../components/HomePageComponents/Work";
import { HireBest } from "../../components/ServicePageComponents/HireBest";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <IndustryExpertise />
      <Work />
      <OurExpertise />
      <Impact />
      <HireBest />
    </div>
  );
};

export default Home;
