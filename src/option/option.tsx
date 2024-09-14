import React from "react";
import { createRoot } from "react-dom/client";

const option = <h1>Hello from Option</h1>;

const divRootContainer = document.createElement("div");
const root = createRoot(divRootContainer);
document.body.appendChild(divRootContainer);

root.render(option);
