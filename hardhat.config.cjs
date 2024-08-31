require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.23",
    networks: {
        "base-sepolia": {
            chainId: 84532,
            url: "https://sepolia.base.org", // Insert Infura Celo Url here
            accounts: [`0x${process.env.WALLET_KEY}`],
        },
    },
};
