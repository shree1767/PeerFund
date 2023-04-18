import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { setGlobalState, useGlobalState } from "../store";
import { updateCampaign } from "../utils/campaignUtils";

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState("updateModal");
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [imageURL, setImageURL] = useState(project?.imageURL);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !imageURL) return;

    const params = {
      id: project?.id,
      title,
      description,
      imageURL,
    };

    await updateCampaign(params);
    toast.success("Project updated successffully, will reflect in 30sec.");
    onClose();
  };

  const onClose = () => {
    setGlobalState("updateModal", "scale-0");
  };
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transition-transform duration-300 ${updateModal}`}
    >
      <div className="projectCard shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <span></span>
            <button
              onClick={() => setGlobalState("updateModal", "scale-0")}
              type="button"
              className="border-0 bg-trnasparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[2rem] text-white">Edit</p>
            <div className="flex justify-center items-center mt-5">
              <div className="shrink-0 rounded-xl overflow-hidden h-20 w-20">
                <img
                  src={
                    imageURL ||
                    "https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg"
                  }
                  alt={project.title}
                  className="h-full w-full object-cover cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-white focus:outline focus:ring-0"
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
              className="block w-full bg-transparent border-0 text-sm text-white focus:outline focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires"
            />
          </div>

          <div className="flex justify-between items-center bg-[#121212] rounded-xl mt-5">
            <input
              className="block w-full bg-transparent border-0 text-sm text-white focus:outline focus:ring-0"
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
              className="block w-full bg-transparent border-0 text-sm text-white focus:outline focus:ring-0"
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
            className="inline-block px-6 py-2.5 bg-white text-black font-medium text-md leading-tight rounded-full shadow-md  mt-5"
          >
            Update Donation
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
