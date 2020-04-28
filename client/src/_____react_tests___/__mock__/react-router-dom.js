import React from 'react';
// Just render plain div with its children
const rrd = require('react-router-dom');

rrd.BrowserRouter = ({children}) => <div>{children}</div>
module.exports = rrd;