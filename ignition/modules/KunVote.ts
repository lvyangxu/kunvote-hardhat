import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const kunVoteModule = buildModule("KunVoteModule", (m) => {

  const kunVote = m.contract("KunVote", [], {});
  return { kunVote };
});

export default kunVoteModule;
