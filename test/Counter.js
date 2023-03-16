//Test go here
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", () => {
	let counter;

	beforeEach(async () => {
		const Counter = await ethers.getContractFactory("Counter");
		counter = await Counter.deploy("My Counter", 1);
	});

	describe("Deployment", () => {
		it("sets the initial count", async () => {
			expect(await counter.count()).to.equal(1);
		});

		it("sets the initial name", async () => {
			expect(await counter.name()).to.equal("My Counter");
		});
	});

	describe("Counting", () => {
		let transaction;

		it("reads the count from the public variable", async () => {
			expect(await counter.count()).to.equal(1);
		});

		it("reads the count from the getCount()", async () => {
			expect(await counter.getCount()).to.equal(1);
		});

		it("increments the count", async () => {
			transaction = await counter.increment();
			await transaction.wait();

			expect(await counter.count()).to.equal(2);

			transaction = await counter.increment();
			await transaction.wait();

			expect(await counter.count()).to.equal(3);
		});

		it("decrements the count", async () => {
			transaction = await counter.decrement();
			await transaction.wait();

			expect(await counter.count()).to.equal(0);

			// cannot count decrement below zero
			expect(counter.count()).to.be.reverted;
		});

		it("reads the name from the public variable", async () => {
			expect(await counter.name()).to.equal("My Counter");
		});

		it("reads the count from the getName()", async () => {
			expect(await counter.getName()).to.equal("My Counter");
		});

		it("updates the Name", async () => {
			transaction = await counter.setName("New Name");
			await transaction.wait();
			expect(await counter.name()).to.equal("New Name");
		});
	});
});
