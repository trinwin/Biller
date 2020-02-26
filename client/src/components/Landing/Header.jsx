import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header {...props}>
      <div className="header-content">
        <Link to="/">
          <h1>
            <a>Biller Logo</a>
            <h3>Biller</h3>
          </h1>
        </Link>
      </div>
    </header>
  );
}
