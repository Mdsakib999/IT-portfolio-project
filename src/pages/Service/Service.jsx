import { AlcalineWorks } from "../../components/ServicePageComponents/AlcalineWorks";
import { Approach } from "../../components/ServicePageComponents/Approach";
import { HireBest } from "../../components/ServicePageComponents/HireBest";
import { OfferedServices } from "../../components/ServicePageComponents/OfferedServices";
import { ServiceBanner } from "../../components/ServicePageComponents/ServiceBanner";
import ShowPrice from "../../components/ServicePageComponents/ShowPrice";
import { WhyChooseUs } from "../../components/ServicePageComponents/WhyChooseUs";

export const Service = () => {
  return (
    <div>
      <ServiceBanner />
      <OfferedServices />
      <ShowPrice/>
      <HireBest />
      <WhyChooseUs />
      <Approach />
      <AlcalineWorks />
    </div>
  );
};
