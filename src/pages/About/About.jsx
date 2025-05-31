import { AboutBanner } from "../../components/AboutPageComponents/AboutBanner";
import { AboutSection } from "../../components/AboutPageComponents/AboutSection";
import { Companies } from "../../components/AboutPageComponents/Companies";
import { FeaturedResources } from "../../components/AboutPageComponents/FeaturedResources";
import { Milestone } from "../../components/AboutPageComponents/Milestone";
import { Testimonials } from "../../components/AboutPageComponents/Testimonials";
import { TrustAndTeam } from "../../components/AboutPageComponents/TrustAndTeam";
import { ValuesSection } from "../../components/AboutPageComponents/ValuesSection";

const About = () => {
  return (
    <div>
      <AboutBanner />
      <AboutSection />
      <ValuesSection />
      <Milestone />
      <TrustAndTeam />
      <Companies />
      <FeaturedResources />
      <Testimonials />
    </div>
  );
};

export default About;
