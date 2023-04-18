import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setGlobalState, useGlobalState } from "../store";
import "./Project.css";

import { createCampaign } from "../utils/campaignUtils";

const CreateProject = () => {
  const [createModal] = useGlobalState("createModal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageURL] = useState("");

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !goal || !date || !imageURL) return;
    if (Date.parse(date) < Date.now()) {
      alert("Date cannot be in the past!");
      return;
    }

    const params = {
      title,
      description,
      goal,
      expiresOn: toTimestamp(date),
      imageURL,
    };

    await createCampaign(params);
    toast.success("Project created successfully, will reflect in 30sec.");
    onClose();
  };

  const onClose = () => {
    setGlobalState("createModal", "scale-0");
    reset();
  };

  const reset = () => {
    setTitle("");
    setGoal("");
    setDescription("");
    setImageURL("");
    setDate("");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${createModal}`}
    >
      <div className="projectCard shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <span></span>
            <button
              onClick={() => setGlobalState("createModal", "scale-0")}
              type="button"
              className="border-0 bg-trnasparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[2rem] text-white">
                Add Donation
              </p>
            </div>
            <div className="flex justify-center items-center mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  src={
                    imageURL ||
                    "https://financefeeds.com/wp-content/uploads/2022/07/WEB3.jpeg"
                  }
                  alt="project title"
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent text-sm text-white"
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div>

          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent text-sm text-white"
              type="number"
              step={0.01}
              min={0.01}
              name="goal"
              placeholder="Goal (ETH)"
              onChange={(e) => setGoal(e.target.value)}
              value={goal}
              required
            />
          </div>

          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent text-sm text-white"
              type="date"
              name="date"
              placeholder="Expires on"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>

          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent text-sm text-white"
              type="url"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>
          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <textarea
              className="block w-full bg-transparent text-sm text-white"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-white text-black font-medium text-md leading-tight rounded-full shadow-md mt-5"
          >
            Submit Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
