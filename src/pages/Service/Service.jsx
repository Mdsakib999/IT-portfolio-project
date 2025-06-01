import { AlcalineWorks } from "../../components/ServicePageComponents/AlcalineWorks";
import { Approach } from "../../components/ServicePageComponents/Approach";
import { HireBest } from "../../components/ServicePageComponents/HireBest";
import { OfferedServices } from "../../components/ServicePageComponents/OfferedServices";
import Pricing from "../../components/ServicePageComponents/Pricing";
import { ServiceBanner } from "../../components/ServicePageComponents/ServiceBanner";

export const Service = () => {
	return (
		<div>
			<ServiceBanner />
			<OfferedServices />
			<Pricing />
			<HireBest />
			<Approach />
			<AlcalineWorks />
		</div>
	);
};
