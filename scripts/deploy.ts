import { ethers } from "hardhat";

async function main() {

  const nnvnickTokenFactory = await ethers.getContractFactory("NnvNickToken");
  const nnvnickToken = await nnvnickTokenFactory.deploy(ethers.utils.parseUnits("100000"));

  await nnvnickToken.deployed();

  console.log("NnvNickToken deployed to:", nnvnickToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});