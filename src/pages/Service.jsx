import { ServiceBanner } from "../components/ServicePageComponents/ServiceBanner";
import { HireBest } from "../components/ServicePageComponents/HireBest";
import { Approach } from "../components/ServicePageComponents/Approach";
import { AlcalineWorks } from "../components/ServicePageComponents/AlcalineWorks";
import { OfferedServices } from "../components/ServicePageComponents/OfferedServices";

export const Service = () => {
	return (
		<div>
			<ServiceBanner />
			<OfferedServices />
			<HireBest />
			<Approach />
			<AlcalineWorks />
		</div>
	);
};
