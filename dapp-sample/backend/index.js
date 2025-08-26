import express from "express";
import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL); // Reth RPC
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contractAddress = process.env.CONTRACT_ADDRESS;
const abi = [
  "function setData(string memory _data) external",
  "function data() view returns (string memory)"
];
const contract = new ethers.Contract(contractAddress, abi, wallet);

// Routes
app.post("/set", async (req, res) => {
  const { value } = req.body;
  const tx = await contract.setData(value);
  await tx.wait();
  res.json({ tx: tx.hash });
});

app.get("/get", async (req, res) => {
  const value = await contract.data();
  res.json({ data: value });
});

app.listen(4001, () => console.log("Backend running on 4001"));
