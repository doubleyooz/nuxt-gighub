import { ethers } from "ethers";

import Freelancing from "@/build/contracts/Freelancing.json";
import Giveaway from "@/build/contracts/Giveaway.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useContracts = () => {
  const loading = ref(false);
  const usdToEth = (usdAmount: number) => {
    const ethExchangeRate = 3000;
    return usdAmount / ethExchangeRate;
  };

  const networkUrl = "http://localhost:7545";

  const createGigContract = async (budget: number) => {
    loading.value = true;

    try {
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const wallet = await withTimeout(12000, browserProvider.getSigner());

      const contractABI = Freelancing.abi;
      const contractBinary = Freelancing.bytecode;
      const contractFactory = new ethers.ContractFactory(
        contractABI,
        contractBinary,
        wallet
      );
      const unlockTime = Math.floor(Date.now() / 1000) + 600;
      const budgetInWei = ethers.parseEther(usdToEth(budget).toString());

      const contract = await contractFactory.deploy(unlockTime, {
        value: budgetInWei,
      });
      console.log({ contractAddress: contract.target });
      if (!contract) throw new Error("failed to create contract");

      loading.value = false;
      return contract;
    } catch (err) {}

    loading.value = false;
  };

  const earnFunds = async () => {
    loading.value = true;
    const provider = new ethers.JsonRpcProvider(networkUrl);

    const wallet = new ethers.Wallet(
      "0x1bd84a0bb8b113b8f1ab8615cfe5b4cc5b765fed659a72d2dacc1a4cca3b9909",
      provider
    );
    const contractABI = Giveaway.abi;
    const contractBinary = Giveaway.bytecode;
    const contractFactory = new ethers.ContractFactory(
      contractABI,
      contractBinary,
      wallet
    );
    const budgetInWei = ethers.parseEther(usdToEth(50000).toString());

    const contract = await contractFactory.deploy({
      value: budgetInWei,
    });

    try {
      // Replace with the actual freelancer address
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const freelancerWallet = await withTimeout(
        12000,
        browserProvider.getSigner()
      );

      const tx = await contract.withdraw(freelancerWallet.address);
      await tx.wait(); // Wait for the transaction to be mined
      console.log({ balance: await provider.getBalance(contract.target) });
      console.log("Withdrawal successful!");
    } catch (error) {
      console.error("Error:", error);
    }

    loading.value = false;
  };

  const bindFreelancer = async (
    contractAddress: string | undefined,
    freelancerAddress: string | undefined | null
  ) => {
    if (!(contractAddress && freelancerAddress)) return;
    loading.value = true;

    const contractABI = Freelancing.abi;

    try {
      // Replace with the actual freelancer address

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await withTimeout(12000, browserProvider.getSigner());
      const GIGContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await GIGContract.setFreelancer(freelancerAddress);
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Freelancer set successfully!");
    } catch (error) {
      console.error("Error:", error);
    }

    loading.value = false;
  };

  const payFreelancer = async (contractAddress: string | undefined) => {
    if (!contractAddress) return;
    loading.value = true;

    const contractABI = Freelancing.abi;

    try {
      // Replace with the actual freelancer address

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await withTimeout(12000, browserProvider.getSigner());
      const GIGContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      const tx = await GIGContract.withdraw();
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Freelancer set successfully!");
    } catch (error) {
      console.error("Error:", error);
    }

    loading.value = false;
  };

  return { createGigContract, bindFreelancer, earnFunds, loading };
};
