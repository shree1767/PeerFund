import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import EditProfile from "./components/EditProfile";
import Header from "./components/Header";
import CreateProfile from "./views/CreateProfile";
import Home from "./views/Home";
// import Profile from "./views/Profile";
import Project from "./views/Project";
// import Campaigns from "./views/Campaigns"

import { isWallectConnected } from "./utils/walletUtils";

axios.defaults.baseURL = "http://127.0.0.1:4000";
axios.defaults.withCredentials = true;
const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await isWallectConnected();
      console.log("Blockchain loaded");
      setLoaded(true);
    })();
  }, []);
  return (
    <div className="min-h-screen relative">
      <Header />
      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/Profile" element={<Profile />} /> */}
          {/* <Route path="/EditProfile" element={<EditProfile />} /> */}
          <Route path="/CreateProfile" element={<CreateProfile />} />
          <Route path="/projects/:id" element={<Project />} />
          {/* <Route path="/Campaigns" element={<Campaigns />}/> */}
        </Routes>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;