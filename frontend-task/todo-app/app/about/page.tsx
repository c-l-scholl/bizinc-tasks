"use client";

import "./about.css";

// Animation idea from https://www.letsbuildui.dev/articles/how-to-animate-borders-in-css/

/**
 * The about page component which contains a neat animation
 * @function
 */
const About = () => {
	return (
		<div className="container">
			<div className="card">
				<div className="inner">
					<h2 className="about-title">About</h2>
					<p>Here is my second page</p>
				</div>
			</div>
		</div>
	);
};

export default About;
