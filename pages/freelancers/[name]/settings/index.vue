<template>
  <div>
    <pre>{{ userStore.loadedUser }}</pre>
    <div class="flex w-full justify-center mt-4">
      <app-button
        class="small ml-2"
        size="large"
        :loading="loading"
        :text="'Earn funds'"
        @click="earnFunds"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Giveaway from "@/build/contracts/Giveaway.json";
import { ethers } from "ethers";
const userStore = useUserStore();

const loading = ref(false);
const usdToEth = (usdAmount: number) => {
  const ethExchangeRate = 3000;
  return usdAmount / ethExchangeRate;
};
const earnFunds = async () => {
  loading.value = true;
  const provider = new ethers.JsonRpcProvider("http://localhost:7545");

  const wallet = new ethers.Wallet(
    "0xa71b57e098d7d778d640fed71a7781080bb1aebf04f52544942186c4fc587e0c",
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
</script>
