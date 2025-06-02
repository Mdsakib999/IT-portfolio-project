import { AlcalineWorks } from "../../components/ServicePageComponents/AlcalineWorks";
import { Approach } from "../../components/ServicePageComponents/Approach";
import { HireBest } from "../../components/ServicePageComponents/HireBest";
import { OfferedServices } from "../../components/ServicePageComponents/OfferedServices";
import { ServiceBanner } from "../../components/ServicePageComponents/ServiceBanner";

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
