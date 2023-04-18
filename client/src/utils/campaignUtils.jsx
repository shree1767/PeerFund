import { ethers } from "ethers";
import address from "../abi/address.json";
import abi from "../abi/Campaigns.json";
import { getGlobalState, setGlobalState } from "../store";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
let tx;

const getContract = async () => {
  const [connectedAccount] = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);

    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const createCampaign = async ({
  title,
  description,
  imageURL,
  goal,
  expiresOn,
}) => {
  try {
    if (!ethereum) return alert("Please install metamask");

    const contract = await getContract();
    goal = ethers.utils.parseEther(goal);
    tx = await contract.createCampaign(
      title,
      description,
      imageURL,
      goal,
      expiresOn,
    );

    await tx.wait();
    await loadCampaigns();
  } catch (error) {
    reportError(error);
  }
};

const updateCampaign = async ({ id, title, description, imageURL }) => {
  try {
    if (!ethereum) return alert("Please install Metamask");

    const contract = await getContract();
    tx = await contract.updateCampaign(id, title, description, imageURL);
    await tx.wait();
    await loadCampaign(id);
  } catch (error) {
    reportError(error);
  }
};

const deleteCampaign = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    await contract.deleteCampaign(id);
  } catch (error) {
    reportError(error);
  }
};

const loadCampaigns = async () => {
  try {
    if (!ethereum) return alert("Please install emtamask");

    const contract = await getContract();
    const campaigns = await contract.getCampaigns();
    const stats = await contract.stats();

    setGlobalState("stats", structureStats(stats));
    setGlobalState("projects", structuredCampaigns(campaigns));
  } catch (error) {
    reportError(error);
  }
};

const loadCampaign = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const project = await contract.getCampaign(id);

    setGlobalState("project", structuredCampaigns([project])[0]);
  } catch (error) {
    alert(JSON.stringify(error.message));
    reportError(error);
  }
};

const backCampaign = async (id, amount) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();
    amount = ethers.utils.parseEther(amount);

    tx = await contract.backCampaign(id, {
      from: connectedAccount,
      value: amount._hex,
    });

    await tx.wait();
    await getBackers(id);
  } catch (error) {
    reportError(error);
  }
};

const getBackers = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    let backers = await contract.getBackers(id);

    setGlobalState("backers", structuredBackers(backers));
  } catch (error) {
    reportError(error);
  }
};

const payoutCampaign = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const connectedAccount = getGlobalState("connectedAccount");
    const contract = await getContract();

    tx = await contract.payOutProject(id, {
      from: connectedAccount,
    });

    await tx.wait();
    await getBackers(id);
  } catch (error) {
    reportError(error);
  }
};

const createUpdate = async (id, text) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    await contract.createUpdate(id, text);
  } catch (error) {
    reportError(error);
  }
};

const loadUpdate = async (id) => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getContract();
    const updates = await contract.getUpdate(id);

    setGlobalState("updates", structuredUpdates(updates));
    return updates;
  } catch (error) {
    alert(JSON.stringify(error.message));
    reportError(error);
  }
};

const structuredUpdates = (updates) => {
  updates.map((update) => ({
    text: update.text,
    timestamp: new Date(update.timestamp.toNumber() * 1000).toJSON(),
  }));
};

const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.backer.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(backer.contribution._hex) / 10 ** 18,
    }))
    .reverse();

const structuredCampaigns = (campaigns) =>
  campaigns
    .map((campaign) => ({
      id: campaign.id.toNumber(),
      owner: campaign.owner.toLowerCase(),
      title: campaign.title,
      description: campaign.description,
      timestamp: new Date(campaign.timestamp.toNumber()).getTime(),
      expiresOn: new Date(campaign.expiresOn.toNumber()).getTime(),
      date: toDate(campaign.expiresOn.toNumber() * 1000),
      imageURL: campaign.imageURL,
      raised: parseInt(campaign.raised._hex) / 10 ** 18,
      goal: parseInt(campaign.goal._hex) / 10 ** 18,
      backers: campaign.backers.toNumber(),
      status: campaign.status,
    }))
    .reverse();

const toDate = (timestamp) => {
  const date = new Date(timestamp);
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`;
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

const structureStats = (stats) => ({
  totalCampaigns: stats.totalCampaigns.toNumber(),
  totalBackings: stats.totalBackings.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
});

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object!");
};

export {
  createCampaign,
  updateCampaign,
  deleteCampaign,
  loadCampaigns,
  loadCampaign,
  backCampaign,
  getBackers,
  payoutCampaign,
  createUpdate,
  loadUpdate,
};
