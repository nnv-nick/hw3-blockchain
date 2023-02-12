import { ethers } from "hardhat";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";

import { NnvNickToken } from "../typechain-types/contracts/NnvNickToken";
import { NnvNickToken__factory } from "../typechain-types/factories/contracts/NnvNickToken__factory";
import { Signer } from "ethers";

chai.use(chaiAsPromised);
const { expect } = chai;

describe("Test NnvNickToken", () => {
  let NnvNickTokenFactory: NnvNickToken__factory;
  let NnvNickToken: NnvNickToken;

  describe("Deployment", () => {
    let deployer: Signer;

    beforeEach(async () => {
      [deployer] = await ethers.getSigners();
      NnvNickTokenFactory = new NnvNickToken__factory(deployer);
      NnvNickToken = await NnvNickTokenFactory.deploy(100);
      await NnvNickToken.deployed();
    });

    it("should have the correct name", async () => {
      expect(await NnvNickToken.name()).to.equal("NnvNick");
    });

    it("should have the correct symbol", async () => {
      expect(await NnvNickToken.symbol()).to.equal("NNV");
    });

    it("should have the correct total supply", async () => {
      expect((await NnvNickToken.totalSupply()).toString()).to.equal("100");
    });

    it("should have correct balance after deployment", async () => {
      expect(await NnvNickToken.balanceOf(await deployer.getAddress())).to.equal("100");
    });

    it("should have correct balance after minting new coins", async () => {
      await NnvNickToken.mint(await deployer.getAddress(), 256);
      expect(await NnvNickToken.balanceOf(await deployer.getAddress())).to.equal("356");
    });
  });
});