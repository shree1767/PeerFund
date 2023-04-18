import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackProject from "../components/BackProject";
import DeleteProject from "../components/DeleteProject";
import ProjectBackers from "../components/ProjectBackers";
import ProjectDetails from "../components/ProjectDetails";
import ShareButton from "../components/ShareButton";
import UpdateProject from "../components/UpdateProject";
import { useGlobalState } from "../store";
import { getBackers, loadCampaign } from "../utils/campaignUtils";

function Project() {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [project] = useGlobalState("project");
  const [backers] = useGlobalState("backers");

  useEffect(() => {
    (async () => {
      await loadCampaign(id);
      await getBackers(id);
      setLoaded(true);
    })();
  }, []);
  return loaded ? (
    <>
      <ProjectDetails project={project} />
      <UpdateProject project={project} />
      <DeleteProject project={project} />
      <BackProject project={project} />
      <ProjectBackers backers={backers} />
      <ShareButton project={project} />
    </>
  ) : null;
}

export default Project;
