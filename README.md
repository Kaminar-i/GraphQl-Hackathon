# Colab Student Registry

## Project Overview

The **Colab Student Registry** is a Solidity-based smart contract designed to facilitate the registration of students. The process requires students to pay a fee before they can register. Once payment is confirmed, they can register, but the registration must be authorized by the contract owner before it is fully accepted.

## Features

- **Payment System**: Students must pay a fee before registering.
- **Registration Authorization**: The contract owner must authorize the registration of a student.
- **Student Management**: The contract provides functionalities to add, update, view, and delete student records.
- **Fee Withdrawal**: The contract owner can withdraw the collected fees.

## Project Structure

- **Contracts**: Contains the `StudentRegistryV2.sol` contract, which implements the core functionality of the registry.
- **Tests**: Contains TypeScript files used for testing the contract.
- **Subgraph**: Contains configuration files for the subgraph.
- **Scripts**: Includes deployment scripts and utility scripts.
- **Configuration Files**: Includes `package.json`, `yarn.lock`, `tsconfig.json`, and other configuration files necessary for setting up the project.

## React + Vite

This project uses React with Vite for the frontend. The Vite setup provides a minimal configuration to get React working with Hot Module Replacement (HMR) and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Installation and Setup

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/colab-student-registry.git
   cd colab-student-registry

2. **Install dependencies: The project uses Yarn as the package manager. Install the dependencies by running**:
    ```bash
    yarn install
    
3.  **Compile the contracts: Compile the Solidity contracts using Hardhat**:
    ```bash
    npx hardhat compile
  
4.  **Run Tests: You can run the tests to ensure the contract functions as expected**:
    ```bash
    npx hardhat test

5. **Deploy the contract: Deploy the contract to your preferred network**:
   ```bash
    npx hardhat run scripts/deploy.ts --network <network-name>
   

**Description:**
This smart contract provides a decentralized platform for student registration and management. It allows students to register, pay fees, and view their registration status. The contract owner can authorize registrations, update student information, and withdraw accumulated fees.

### Usage

#### Functions
* **`payFee()`:** Students pay a fee before registering.
* **`registerStudent(address, string, uint256)`:** Students register with their address, name, and age.
* **`authorizeRegistration(address)`:** The contract owner authorizes a student's registration.
* **`getStudentInfo(address)`:** Retrieves student information based on address.
* **`getStudentInfoById(uint256)`:** Retrieves student information based on ID.
* **`updateStudentInfo(address, string, uint256)`:** Updates student information.
* **`deleteStudent(address)`:** Deletes a student's record.
* **`withdrawFees()`:** The contract owner withdraws accumulated fees.

### Dependencies
* **Scaffold:** For setting up the development environment
* **Yarn:** Package manager
* **Hardhat:** Development environment for smart contracts
* **TypeScript:** For writing tests and scripts
* **React + Vite:** For the frontend interface

### Testing
The project includes TypeScript-based tests for the contract.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
