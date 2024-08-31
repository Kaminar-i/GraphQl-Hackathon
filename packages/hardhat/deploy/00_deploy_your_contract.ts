import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

const deployStudentRegistryV2: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Deploy the StudentRegistryV2 contract
  await deploy("StudentRegistryV2", {
    from: deployer,
    log: true,
    autoMine: true, // Speed up the deployment process on local networks
  });

  // Get the deployed contract instance
  const studentRegistryV2 = await hre.ethers.getContract<Contract>(
    "StudentRegistryV2",
    deployer
  );

  console.log("StudentRegistryV2 deployed at:", studentRegistryV2.address);

  // Example interaction: Retrieve the first student's data (if any)
  // This part is optional and just serves as a sample interaction
  try {
    const student = await studentRegistryV2.getStudent(1);
    console.log("👋 First student info:", student);
  } catch (error) {
    console.log("No students registered yet.");
  }
};

export default deployStudentRegistryV2;

// Tags are useful for running specific deploy scripts
deployStudentRegistryV2.tags = ["StudentRegistryV2"];


// import { HardhatRuntimeEnvironment } from "hardhat/types";
// import { DeployFunction } from "hardhat-deploy/types";
// import { Contract } from "ethers";

// /**
//  * Deploys a contract named "YourContract" using the deployer account and
//  * constructor arguments set to the deployer address
//  *
//  * @param hre HardhatRuntimeEnvironment object.
//  */
// const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
//   /*
//     On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

//     When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
//     should have sufficient balance to pay for the gas fees for contract creation.

//     You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
//     with a random private key in the .env file (then used on hardhat.config.ts)
//     You can run the `yarn account` command to check your balance in every network.
//   */
//   const { deployer } = await hre.getNamedAccounts();
//   const { deploy } = hre.deployments;

//   await deploy("YourContract", {
//     from: deployer,
//     // Contract constructor arguments
//     args: [deployer],
//     log: true,
//     // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
//     // automatically mining the contract deployment transaction. There is no effect on live networks.
//     autoMine: true,
//   });

//   // Get the deployed contract to interact with it after deploying.
//   const yourContract = await hre.ethers.getContract<Contract>("YourContract", deployer);
//   console.log("👋 Initial greeting:", await yourContract.greeting());
// };

// export default deployYourContract;

// // Tags are useful if you have multiple deploy files and only want to run one of them.
// // e.g. yarn deploy --tags YourContract
// deployYourContract.tags = ["YourContract"];
