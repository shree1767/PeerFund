import React, { useEffect } from "react";
import AddButton from "../components/AddButton";
import BackProject from "../components/BackProject";
import CreateProject from "../components/CreateProject";
import Hero from "../components/Hero";
import Projects from "../components/Projects";

import { useGlobalState } from "../store";
import { loadCampaigns } from "../utils/campaignUtils";

const Home = () => {
  const [projects] = useGlobalState("projects");

  useEffect(() => {
    (async () => {
      await loadCampaigns();
    })();
  }, []);
  return (
    <>
      <Hero />
      <Projects projects={projects} />
      <CreateProject />
      <BackProject />
      <AddButton />
    </>
  );
};

export default Home;
