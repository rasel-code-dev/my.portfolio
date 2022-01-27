import React, {lazy, Suspense} from 'react';
import ReactLazyPreload from "../../utilities/ReactLazyPreload";

const ProjectSection = ReactLazyPreload(()=>import("./ProjectSection"))

const ProjectSimple = (props) => {
	return (
		<div id="project-section" data-role="project">
			<Suspense fallback={<div></div>}>
				<ProjectSection {...props} />
			</Suspense>
		</div>
	);
};

export default ProjectSimple;