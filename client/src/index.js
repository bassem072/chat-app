import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import './index.css';
import App from './App';
import { store } from './store';
import reportWebVitals from './reportWebVitals';
import setupInterceptors from "./services/setupInterceptors";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='584607999856-ld0vd3n2q9acoh7i03751dljt09h56cn.apps.googleusercontent.com'>
    <React.StrictMode>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

setupInterceptors(store);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
