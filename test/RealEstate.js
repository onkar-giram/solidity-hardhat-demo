const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RealEstate", () => {
	let realEstate, escrow;
	let deployer, seller;
	let nftId = 1;

	beforeEach(async () => {
		//setup accounts
		accounts = await ethers.getSigners();
		deployer = accounts[0];
		seller = deployer;

		// Load contracts
		const RealEstate = await ethers.getContractFactory("RealEstate");
		const Escrow = await ethers.getContractFactory("Escrow");

		//Deploy contracts
		realEstate = await RealEstate.deploy();
		escrow = await Escrow.deploy();
	});

	describe("Deployment", async () => {
		it("sends an NFT to seller/deployer", async () => {
			expect(await realEstate.ownerOf(nftId)).to.equal(seller.address);
		});
	});
});
