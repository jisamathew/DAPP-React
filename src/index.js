// import React and REACTDOM library
import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.css';
import App,{message} from './App';
//2.Get a reference to the div with id 'root'
const rootElement = document.getElementById('root');

//3.Tell React to tke control of that element
const root = ReactDOM.createRoot(rootElement);

//4.Show component on screen
root.render(<App />);

// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";

// const rootElement = document.getElementById("root");
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   rootElement
// );