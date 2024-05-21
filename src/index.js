import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom/client';
// import { createRoot } from 'react-dom';
import App from './App';
import Main from './Main';
import './helpers/initFA';
import './i18n';


  // const root = ReactDOM.createRoot(document.getElementById("main"));
  const root = ReactDOM.createRoot(document.getElementById("main"));
  root.render(
    // <React.StrictMode>
    //   <App />
    // </React.StrictMode>,
    <Main>
      <App />
    </Main>,
  );

// ReactDOM.render(
//   <Main>
//     <App />
//   </Main>,
//   document.getElementById('main')
// );
