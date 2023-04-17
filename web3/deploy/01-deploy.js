const { network } = require("hardhat");
const fs = require("fs");

require("dotenv").config();

const { developmnetChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  const contract = await deploy("Campaigns", {
    from: deployer,
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  const address = JSON.stringify({ address: contract.address }, null, 4);
  fs.writeFile(
    "../client/src/abi/address.json",
    address,
    { encoding: "utf8", flag: "w" },
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Deployed contract successfully at: ${address}`);
    },
  );

  fs.copyFile(
    "./artifacts/contracts/Campaigns.sol/Campaigns.json",
    "../client/src/abi/Campaigns.json",
    (error) => {
      if (error) {
        throw error;
      } else {
        console.log("File has been moved to another folder.");
      }
    },
  );

  if (
    !developmnetChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY &&
    !network.name.includes("fire")
  ) {
    await verify(contract.address);
  }
  log("------------------------------------------------");
};
