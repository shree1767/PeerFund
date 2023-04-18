import React from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setGlobalState, useGlobalState } from "../store";
import { deleteCampaign } from "../utils/campaignUtils";
import "./Project.css";
const DeleteProject = ({ project }) => {
  const [deleteModal] = useGlobalState("deleteModal");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await deleteCampaign(project?.id);
    toast.success("Project deleted successfully, will reflect in 30sec.");
    setGlobalState("deleteModal", "scale-0");
    navigate.push("/");
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${deleteModal}`}
    >
      <div className="deleteProject shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-white">{project?.title}</p>
            <button
              onClick={() => setGlobalState("deleteModal", "scale-0")}
              type="button"
              className="border-0 bg-trnasparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[2rem] text-white">
              Delete Project
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
            <p className="text-white font-medium">Are you Sure?</p>
            <small className="flex text-red-400">This is irreversible</small>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-white text-black font-medium text-md leading-tight rounded-full shadow-md hover:bg-red-800 mt-5"
            onClick={handleSubmit}
          >
            Delete Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProject;
