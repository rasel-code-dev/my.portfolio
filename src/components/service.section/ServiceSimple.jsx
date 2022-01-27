import React, {Suspense} from 'react';

const ServiceSection = ReactLazyPreload(()=>import("./serviceSection"));
import ReactLazyPreload from "../../utilities/ReactLazyPreload";

const ServiceSimple = () => {
	return (
		<div id="service-section"  data-role="service">
			<Suspense fallback={<div></div>}>
				<ServiceSection />
			</Suspense>
		</div>
	);
};

export default ServiceSimple;