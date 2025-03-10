import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./Context/AppContext";
import NavBar from "./pages/NavBar";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AppContextProvider>
      <NavBar></NavBar>
    <App />
    <Toaster />
    </AppContextProvider>
  </BrowserRouter>
);
