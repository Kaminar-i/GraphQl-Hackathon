require("hardhat");

async function main() {
    const StudentRegistryV2 = await ethers.deployContract("StudentRegistryV2");

    await StudentRegistryV2.waitForDeployment();

    console.log(
        "StudentRegistryV2 Contract Deployed at " + StudentRegistryV2.target
    );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
