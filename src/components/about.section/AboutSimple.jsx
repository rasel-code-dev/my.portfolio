import React, {Suspense} from 'react';
import ReactLazyPreload from "src/utilities/ReactLazyPreload";

const  AboutSection = ReactLazyPreload(()=>import("./AboutSection"));

const AboutSimple = (props) => {
	return (
		<div id="about-section" data-role="about" >
			<Suspense fallback={<h1></h1>}>
				
				<AboutSection {...props} />
			</Suspense>
		</div>
	);
};


export default AboutSimple;