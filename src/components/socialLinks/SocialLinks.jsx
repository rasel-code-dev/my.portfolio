import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDev, faFacebookF, faGithub, faGooglePlus, faLinkedin, faYoutube} from "@fortawesome/pro-brands-svg-icons";
import "./styles.scss"

const SocialLinks = ({social_links}) => {
	return (
		<div>
			<div className="social">
				<a target="_blank" href={social_links?.twitter} className="social-icon dev"  > <FontAwesomeIcon icon={faDev} /></a>
				<a target="_blank" href={social_links?.facebook} className="social-icon facebook"><FontAwesomeIcon icon={faFacebookF} /> </a>
				<a target="_blank" href={social_links?.github} className="social-icon github"><FontAwesomeIcon icon={faGithub} /> </a>
				<a target="_blank" href={social_links?.instagram} className="social-icon instagram"><FontAwesomeIcon icon={faLinkedin} /></a>
				<a target="_blank" href={social_links?.youtube} className="social-icon youtube"><FontAwesomeIcon icon={faYoutube} /></a>
				<a target="_blank" href={social_links?.google} className="social-icon google-plus"><FontAwesomeIcon icon={faGooglePlus}/> </a>
			</div>
		</div>
	);
};

export default SocialLinks;