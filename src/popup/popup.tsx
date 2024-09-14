import React from 'react'; 
import {createRoot} from 'react-dom/client'; 
import "./popup.css"; 

const greeting = (
    <h1>Hello, world!</h1>
);

const divRootContainer = document.createElement('div');
const root = createRoot(divRootContainer);
document.body.appendChild(divRootContainer); 

root.render(greeting);