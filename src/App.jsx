import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "./App.css";
import StudentRegistryV2 from "../artifacts/contracts/StudentRegistryV2.sol/StudentRegistryV2.json";

const studentRegistryAddress = "0x4D02E8ed66A127557338C0b9bd014Ebf6B8cb752";
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    gql,
    useQuery,
} from "@apollo/client";

const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/87032/colab-student-registry/version/latest",
    cache: new InMemoryCache(),
});

const GET_DATA = gql`
    {
        addStuds(first: 5) {
            id
            _studentAddr
            blockNumber
            blockTimestamp
        }
        authorizeStudentRegs(first: 5) {
            id
            _studentAddress
            blockNumber
            blockTimestamp
        }
    }
`;

function DataFetcher() {
    const { loading, error, data } = useQuery(GET_DATA);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.addStuds.map((entity) => (
                <div key={entity.id}>
                    <p>Students Added</p>
                    <p>{entity._studentAddr}</p>
                </div>
            ))}
            {data.authorizeStudentRegs.map((entity) => (
                <div key={entity.id}>
                    <p>Authorized Student registered</p>
                    <p>{entity._studentAddr}</p>
                </div>
            ))}
        </div>
    );
}

const App = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [studentAddress, setStudentAddress] = useState("");
    const [fetchedStudent, setFetchedStudent] = useState(null);
    const [walletConnected, setWalletConnected] = useState(false);
    const [signer, setSigner] = useState(null);
    const [owner, setOwner] = useState(null);
    const [feeAmount, setFeeAmount] = useState(null);

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    useEffect(() => {
        if (walletConnected) {
            getContractInfo();
        }
    }, [walletConnected]);

    const checkIfWalletIsConnected = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                await requestAccount();
                setWalletConnected(true);
            } catch (error) {
                console.error("Failed to connect to wallet:", error);
            }
        } else {
            console.log("Please install MetaMask!");
        }
    };

    const requestAccount = async () => {
        await window.ethereum.request({ method: "eth_requestAccounts" });
    };

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                await requestAccount();
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                console.log("Wallet connected:", signer);
                setSigner(signer);
                setWalletConnected(true);
            } catch (error) {
                console.error("Failed to connect to wallet:", error);
            }
        } else {
            alert("Please install MetaMask!");
        }
    };

    const getContractInfo = async () => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
            studentRegistryAddress,
            StudentRegistryV2.abi,
            provider
        );

        try {
            const feeAmount = await contract.FEE_AMOUNT();
            setFeeAmount(ethers.utils.formatEther(feeAmount));
        } catch (error) {
            console.error("Error fetching fee amount:", error);
        }
    };

    const getStudent = async () => {
        if (!walletConnected) {
            alert("Please connect your wallet first!");
            return;
        }
        if (!studentAddress) return;

        try {
            const contract = new ethers.Contract(
                studentRegistryAddress,
                StudentRegistryV2.abi,
                signer
            );
            const data = await contract.getStudentFromMapping(studentAddress);
            setFetchedStudent(data);
        } catch (error) {
            console.error("Error fetching student:", error);
            alert(
                "Error fetching student. Please check the console for details."
            );
        }
    };

    const registerStudent = async () => {
        if (!walletConnected) {
            alert("Please connect your wallet first!");
            return;
        }
        if (!name || !age) {
            alert("Please enter both name and age!");
            return;
        }

        try {
            const contract = new ethers.Contract(
                studentRegistryAddress,
                StudentRegistryV2.abi,
                signer
            );
            const transaction = await contract.register(
                await signer.getAddress(),
                name,
                age
            );
            await transaction.wait();
            alert("Student registered successfully!");
        } catch (error) {
            console.error("Error registering student:", error);
            alert(
                "Error registering student. Please check the console for details."
            );
        }
    };

    const payFee = async () => {
        if (!walletConnected) {
            alert("Please connect your wallet first!");
            return;
        }

        try {
            const contract = new ethers.Contract(
                studentRegistryAddress,
                StudentRegistryV2.abi,
                signer
            );
            const feeAmountWei = ethers.utils.parseEther(feeAmount);
            const transaction = await contract.payFee({ value: feeAmountWei });
            await transaction.wait();
            alert("Fee paid successfully!");
        } catch (error) {
            console.error("Error paying fee:", error);
            alert("Error paying fee. Please check the console for details.");
        }
    };

    return (
        <ApolloProvider client={client}>
            <div className="container">
                <h1>Student Registry</h1>

                {!walletConnected ? (
                    <button onClick={connectWallet}>Connect Wallet</button>
                ) : (
                    <div className="wallet-status">Wallet Connected</div>
                )}

                {feeAmount && <p>Registration Fee: {feeAmount} ETH</p>}

                <h2>Pay Registration Fee</h2>
                <button onClick={payFee}>Pay {feeAmount} ETH Fee</button>

                <h2>Register Student</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <button onClick={registerStudent}>Register Student</button>

                <h2>Fetch Student</h2>
                <input
                    type="text"
                    placeholder="Student Address"
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                />
                <button onClick={getStudent}>Fetch Student</button>

                {fetchedStudent && (
                    <div className="student-details">
                        <h3>Fetched Student Details:</h3>
                        <p>Name: {fetchedStudent.name}</p>
                        <p>Age: {fetchedStudent.age.toString()}</p>
                        <p>Student ID: {fetchedStudent.studentId.toString()}</p>
                        <p>Has Paid: {fetchedStudent.hasPaid ? "Yes" : "No"}</p>
                        <p>
                            Is Authorized:{" "}
                            {fetchedStudent.isAuthorized ? "Yes" : "No"}
                        </p>
                    </div>
                )}
            </div>
            <DataFetcher />
        </ApolloProvider>
    );
};

export default App;
