// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

// import "hardhat/console.sol";

error NotOwner();

contract Campaigns {
    address public owner;
    uint256 public campaignCount;
    statsStruct public stats;
    campaignStruct[] campaigns;

    mapping(address => campaignStruct[]) campaignOwner;
    mapping(uint256 => backerStruct[]) backers;
    mapping(uint256 => bool) public campaignExists;

    enum statusEnum {
        OPEN,
        APPROVED,
        REVERTED,
        DELETED,
        FINISHED
    }

    struct statsStruct {
        uint256 totalCampaigns;
        uint256 totalBackers;
        uint256 totalDonations;
    }

    struct backerStruct {
        address backer;
        uint256 contribution;
        uint256 timestamp;
    }

    struct campaignStruct {
        uint256 id;
        address owner;
        string title;
        string description;
        string imageURL;
        uint256 goal;
        uint256 raised;
        uint256 timestamp;
        uint256 expiresOn;
        uint256 backers;
        statusEnum status;
    }

    modifier ownerOnly() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    event Action(
        uint256 id,
        string actionType,
        address indexed executor,
        uint256 timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    function createCampaign(
        string memory title,
        string memory description,
        string memory imageURL,
        uint256 goal,
        uint256 expiresOn
    ) public returns (bool) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");
        require(goal > 0 ether, "Cost cannot be 0");

        campaignStruct memory campaign;
        campaign.id = campaignCount;
        campaign.owner = msg.sender;
        campaign.title = title;
        campaign.description = description;
        campaign.imageURL = imageURL;
        campaign.goal = goal;
        campaign.timestamp = block.timestamp;
        campaign.expiresOn = expiresOn;

        campaigns.push(campaign);
        campaignExists[campaignCount] = true;
        campaignOwner[msg.sender].push(campaign);
        stats.totalCampaigns += 1;

        emit Action(
            campaignCount++,
            "CAMPAIGN CREATED",
            msg.sender,
            block.timestamp
        );

        return true;
    }

    function updateCampaign(
        uint256 id,
        string memory title,
        string memory description,
        string memory imageURL
    ) public returns (bool) {
        if (msg.sender != campaigns[id].owner) revert NotOwner();
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");
        require(bytes(imageURL).length > 0, "ImageURL cannot be empty");

        campaigns[id].title = title;
        campaigns[id].description = description;
        campaigns[id].imageURL = imageURL;

        emit Action(id, "CAMPAIGN UPDATED", msg.sender, block.timestamp);

        return true;
    }

    function deleteProject(uint256 id) public returns (bool) {
        require(campaigns[id].status == statusEnum.OPEN, "Campaign closed");
        if (msg.sender != campaigns[id].owner || msg.sender != owner)
            revert NotOwner();

        campaigns[id].status = statusEnum.DELETED;
        refund(id);

        emit Action(id, "CAMPAIGN DELETED", msg.sender, block.timestamp);

        return true;
    }

    function backCampaign(uint256 id) public payable returns (bool) {
        require(msg.value > 0 ether, "Contribution must be more than 0");
        require(campaignExists[id], "Campaign not found");
        require(campaigns[id].status == statusEnum.OPEN, "Campaign closed");

        stats.totalBackers += 1;
        stats.totalDonations += msg.value;
        campaigns[id].raised += msg.value;
        campaigns[id].backers += 1;

        backers[id].push(backerStruct(msg.sender, msg.value, block.timestamp));

        emit Action(id, "CAMPAIGN BACKED", msg.sender, block.timestamp);

        if (campaigns[id].raised >= campaigns[id].goal) {
            campaigns[id].status = statusEnum.APPROVED;
            payout(id);
            return true;
        }

        if (block.timestamp >= campaigns[id].expiresOn) {
            campaigns[id].status = statusEnum.REVERTED;
            refund(id);
            return true;
        }

        return true;
    }

    function refund(uint256 id) internal {
        for (uint256 i = 0; i < backers[id].length; i++) {
            address _backer = backers[id][i].backer;
            uint256 _contribution = backers[id][i].contribution;

            backers[id][i].timestamp = block.timestamp;
            payTo(_backer, _contribution);

            stats.totalBackers -= 1;
            stats.totalDonations -= 1;
        }
    }

    function payout(uint256 id) internal {
        campaigns[id].status = statusEnum.FINISHED;

        payTo(campaigns[id].owner, campaigns[id].raised);

        emit Action(id, "CAMPAIGN FINISHED", msg.sender, block.timestamp);
    }

    function payTo(address to, uint256 amount) internal {
        (bool success, ) = payable(to).call{value: amount}("");
        require(success, "Refund Failed!");
    }

    function getCampaign(uint id) public view returns (campaignStruct memory) {
        require(campaignExists[id], "Project not found");

        return campaigns[id];
    }

    function getCampaigns() public view returns (campaignStruct[] memory) {
        return campaigns;
    }

    function getBackers(uint id) public view returns (backerStruct[] memory) {
        return backers[id];
    }
}
