import React from 'react';

import classes from "./style.module.scss"


const Footer = (props) => {
  
  return (
    <div className={classes.footer} id="footer">
      <div className="container" >
        <div className="row-f py-20 justify-space-between">
          <h4 className="t-center">Powered by Rasel</h4>
          <div>
            <h4>Copyright © {new Date().getFullYear()} . All Rights Reserved</h4>
          </div>
        
        </div>
      
      </div>
    </div>
  );
};

export default Footer;