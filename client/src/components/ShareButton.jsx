import React from "react";
import {
  FaTimes,
} from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import FacebookShareButton from "./../../node_modules/react-share/es/FacebookShareButton";
import LinkedinShareButton from "./../../node_modules/react-share/es/LinkedinShareButton";
import TwitterShareButton from "./../../node_modules/react-share/es/TwitterShareButton";
import WhatsappShareButton from "./../../node_modules/react-share/es/WhatsappShareButton";
import "./Project.css";

const ShareButton = ({ project }) => {
  const [shareModal] = useGlobalState("shareModal");

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${shareModal}`}
    >
      <div className="projectCard shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-white">{project?.title}</p>
            <button
              onClick={() => setGlobalState("shareModal", "scale-0")}
              type="button"
              className="border-0 bg-trnasparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[2rem] text-white">
              Share Donation
            </p>
            <div className="flex justify-center items-center mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  src={
                    project?.imageURL ||
                    "https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
                  }
                  alt={project?.title}
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center rounded-xl mt-5">
            <p className="text-white font-medium">
              Share your backings on your socials.
            </p>
            <small className="flex text-white">Here are some options!</small>
          </div>

          <div className="flex gap-5 justify-center mx-auto items-center mt-3">
            <button type="share" className="flex bg-transparent">
              <FacebookShareButton
                url="https://web3-dfund.vercel.app"
                quote="Hey, Check out this campaign I am backing currently!"
              >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="45" height="45"
              viewBox="0 0 48 48">
              <path fill="#039be5" d="M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z"></path><path fill="#fff" d="M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z"></path>
              </svg>
              </FacebookShareButton>
            </button>

            <button type="share" className="flex bg-transparent">
              <LinkedinShareButton
                title="Checkout the new project i am backing"
                summary="It is the future!"
                url="https://web3-dfund.vercel.app"
              >
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              width="45" height="45"
              viewBox="0 0 48 48">
              <path fill="#0288d1" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M14 19H18V34H14zM15.988 17h-.022C14.772 17 14 16.11 14 14.999 14 13.864 14.796 13 16.011 13c1.217 0 1.966.864 1.989 1.999C18 16.11 17.228 17 15.988 17zM35 24.5c0-3.038-2.462-5.5-5.5-5.5-1.862 0-3.505.928-4.5 2.344V19h-4v15h4v-8c0-1.657 1.343-3 3-3s3 1.343 3 3v8h4C35 34 35 24.921 35 24.5z"></path>
              </svg>
              </LinkedinShareButton>
            </button>

            <button type="share" className="flex bg-transparent">
              <TwitterShareButton title="Project I am backing currently" 
              url="https://web3-dfund.vercel.app">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="45" height="45"
viewBox="0 0 48 48">
<path fill="#03a9f4" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"></path><path fill="#fff" d="M36,17.12c-0.882,0.391-1.999,0.758-3,0.88c1.018-0.604,2.633-1.862,3-3 c-0.951,0.559-2.671,1.156-3.793,1.372C31.311,15.422,30.033,15,28.617,15C25.897,15,24,17.305,24,20v2c-4,0-7.9-3.047-10.327-6 c-0.427,0.721-0.667,1.565-0.667,2.457c0,1.819,1.671,3.665,2.994,4.543c-0.807-0.025-2.335-0.641-3-1c0,0.016,0,0.036,0,0.057 c0,2.367,1.661,3.974,3.912,4.422C16.501,26.592,16,27,14.072,27c0.626,1.935,3.773,2.958,5.928,3c-1.686,1.307-4.692,2-7,2 c-0.399,0-0.615,0.022-1-0.023C14.178,33.357,17.22,34,20,34c9.057,0,14-6.918,14-13.37c0-0.212-0.007-0.922-0.018-1.13 C34.95,18.818,35.342,18.104,36,17.12"></path>
</svg>
              </TwitterShareButton>
            </button>

            <button type="share" className="flex bg-transparent">
              <WhatsappShareButton title="" 
              url="https://web3-dfund.vercel.app">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="45" height="45"
viewBox="0 0 48 48">
<path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
</svg>
              </WhatsappShareButton>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareButton;
