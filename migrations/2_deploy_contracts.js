const JudokaRegistry = artifacts.require("JudokaRegistry");
const VotingContract = artifacts.require("VotingContract");
const ProfileManagement = artifacts.require("ProfileManagement");
const ContentManagement = artifacts.require("ContentManagement");
const CompetitionRecords = artifacts.require("CompetitionRecords");
const Verification = artifacts.require("Verification");
const EventParticipation = artifacts.require("EventParticipation");
const CoachRegistry = artifacts.require("CoachRegistry");
const InjuryRegistry = artifacts.require("InjuryRegistry");

module.exports = async function (deployer) {
  await deployer.deploy(JudokaRegistry);
  const judokaRegistryInstance = await JudokaRegistry.deployed();

  await deployer.deploy(VotingContract, judokaRegistryInstance.address);
  const votingContractInstance = await VotingContract.deployed();

  await deployer.deploy(ProfileManagement);
  const profileManagementInstance = await ProfileManagement.deployed();

  await deployer.deploy(ContentManagement);
  const contentManagementInstance = await ContentManagement.deployed();

  await deployer.deploy(CompetitionRecords);
  const competitionRecordsInstance = await CompetitionRecords.deployed();

  await deployer.deploy(Verification);
  const verificationInstance = await Verification.deployed();

  await deployer.deploy(EventParticipation);
  const eventParticipationInstance = await EventParticipation.deployed();

  await deployer.deploy(CoachRegistry);
  const coachRegistryInstance = await CoachRegistry.deployed();

  await deployer.deploy(InjuryRegistry);
  const injuryRegistryInstance = await InjuryRegistry.deployed();

  console.log("Deployed Contracts Addresses:");
  console.log("JudokaRegistry:", judokaRegistryInstance.address);
  console.log("VotingContract:", votingContractInstance.address);
  console.log("ProfileManagement:", profileManagementInstance.address);
  console.log("ContentManagement:", contentManagementInstance.address);
  console.log("CompetitionRecords:", competitionRecordsInstance.address);
  console.log("Verification:", verificationInstance.address);
  console.log("EventParticipation:", eventParticipationInstance.address);
  console.log("CoachRegistry:", coachRegistryInstance.address);
  console.log("InjuryRegistry:", injuryRegistryInstance.address);
};
