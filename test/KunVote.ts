import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("KunVote", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployTest() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const c = await hre.ethers.getContractFactory("KunVote");
    const contract = await c.deploy();
    
    return { contract,owner,otherAccount };
  }



  describe("Vote", function () {
    it("Test Vote Function", async function () {
      const { contract,otherAccount } = await loadFixture(deployTest);
      await contract.vote(1)
      await contract.connect(otherAccount).vote(1)
      const data =  await contract.calc()
      expect(data[0]).to.equal(true);
      expect(data[1]).to.deep.equal([2,0,0]);
    });
  });
});

