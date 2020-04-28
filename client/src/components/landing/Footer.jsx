import React from 'react';
import { footer } from './data';
import Popup from './Popup'

function antCloudFooter() {
  const children = footer.map((item, i) => (
    <div key={i}>
      <Popup text={item.text} content={item.content} />
    </div>
  ));
  return (
    <div>
      <div className="logo" key="logo">
        <img
          src="https://image.flaticon.com/icons/svg/2617/2617996.svg"
          alt="logo"
          width="72"
          height="82"
        />
      </div>
      <div key="nav" className="home-footer-nav-wrapper">
        {children}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="home-layout-wrapper home-footer-wrapper">
      <div className="home-layout">
        {antCloudFooter()}
        <p key="cop" className="copy"></p>
      </div>
    </div>
  );
}

export default Footer;
