import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD
import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import App from './App';
import Store from './store/store';

=======
import { Provider } from 'react-redux';
import App from './App';

// Redux
import Store from './store/store';

>>>>>>> 94a686cca077120d4d64bd1ca07a86072d6f4347
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
