import React from "react";
import { ToastContainer } from "react-toastify";
import Typed from "react-typed";
import { setGlobalState, useGlobalState } from "../store";
import "./Hero.css";

const Hero = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [stats] = useGlobalState("stats");
  return (
    <div className="py-24 px-6 text-center bg-[#121212] text-gray-800">
      <h1 className="text-3xl md:text-6xl xl:text-7xl font-bold text-white tracking-tight py-12">
        <span className="capitalize">Let's make this happen with</span>
        <br />
        <span className="heading text-5xl md:text-6xl xl:text-7xl uppercase text-[#4F0ADF] mt-3">
          <Typed
            strings={["PeerFund"]}
            typeSpeed={150}
            backSpeed={100}
            loop
            cursorChar="|"
          />{" "}
        </span>
      </h1>
      <p className="mb-12 font-regular text-xl text-white tracking-wider">
      Access Equity  | Universal Opportunity  |  Flexible Options   |   Peer to Peer
      </p>
      <div className="flex justify-center space-x-2">
        <button
          type="button"
          className="connect-btn inline-block px-6 py-2.5 bg-[#4F0ADF] text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-[#753DF2]"
          onClick={() => {
            if (connectedAccount === "") alert("Please connect wallet!");
            else setGlobalState("createModal", "scale-100");
          }}
        >
          Add Donation
        </button>

        <button
          type="button"
          className="inline-block px-6 py-2.5 border border-[#4F0ADF] text-[#4F0ADF] font-medium text-xs leading-tight bg-transparent uppercase rounded-full shadow-md hover:bg-[#4F0ADF] hover:text-white"
        >
          Back Donation
        </button>
      </div>

      <div className="projectInfo flex justify-center items-center mt-10">
        <div className="flex flex-col justify-center items-center h-20 border border-[#4F0ADF] shadow-md w-full">
          <span className="text-lg font-bold text-[#753DF2] leading-5">
            {stats?.totalCampaigns || 0}
          </span>
          <span className="text-white">Donations</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 border border-[#4F0ADF] shadow-md w-full">
          <span className="text-lg font-bold text-[#753DF2] leading-5">
            {stats?.totalBackings || 0}
          </span>
          <span className="text-white">Backings</span>
        </div>
        <div className="flex flex-col justify-center items-center h-20 border border-[#4F0ADF] shadow-md w-full">
          <span className="text-lg font-bold text-[#753DF2] leading-5">
            {stats?.totalDonations || 0} ETH
          </span>
          <span className="text-white">Donated</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Hero;
