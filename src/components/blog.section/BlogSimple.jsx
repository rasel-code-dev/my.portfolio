import React, {lazy, Suspense} from 'react';
import ReactLazyPreload from "../../utilities/ReactLazyPreload";

const BlogSection  = ReactLazyPreload(()=>import("./BlogSection"));

const BlogSimple = (props) => {
	return (
		<div>
			<Suspense fallback={<h2>Loading</h2>}>
				<BlogSection  {...props} />
			</Suspense>
			
		</div>
	);
};

export default BlogSimple;