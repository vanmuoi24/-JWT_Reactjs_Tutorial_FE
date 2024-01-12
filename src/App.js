import NavHeader from "./components/Navigation/Nav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Approutes from "./components/routes/Approutes";
import { Route, Router } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import { useSelector } from "react-redux";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavHeader></NavHeader>
        <Approutes />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
