import React from 'react';

import classes from "./style.module.scss"


const Footer = (props) => {
  
  return (
    <div className={classes.footer} id="footer-section">
      <div className="container" >
        <div className="flex py-20 justify-between">
          <h4 className="text-center">Powered by Rasel</h4>
          <div>
            <h4>Copyright © {new Date().getFullYear()} . All Rights Reserved</h4>
          </div>
        
        </div>
      
      </div>
    </div>
  );
};

export default Footer;