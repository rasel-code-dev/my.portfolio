import React, {lazy, Suspense} from 'react'
import ReactLazyPreload from "../../utilities/ReactLazyPreload";

const SkillSection = ReactLazyPreload(()=>import("./SkillsSection"));

const SkillsSimple = ({state}) => {
	return (
		<div data-role="skills" id="skills-section">
			<Suspense fallback={<h1>Loading</h1>}>
				<SkillSection state={state} />
			</Suspense>
		</div>
	);
};


export default SkillsSimple;