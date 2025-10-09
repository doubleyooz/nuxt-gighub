import { ethers } from "ethers";
import { ref } from "vue";
import type { Eip1193Provider } from "ethers";

declare global {
  interface Window {
      ethereum?: Eip1193Provider;
  }
}

// Define response types for clarity
interface MessageResponse {
  metadata?: { token?: string };
}

interface WalletResponse {
  data: any; // Replace with your User type from ~/models/user.model
  metadata: { accessToken: string };
}


export const useMetamask = (baseUrl: string) => {
  const userStore = useUserStore();
  const { authHeaders } = useAccessToken(baseUrl);
  const loading = ref(false);

  const linkWallet = async (userId?: string | number) => {
    loading.value = true;

    try {
      if (!window.ethereum) 
        throw new Error('Metamask not found');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await withTimeout(12000, provider.getSigner());
 
     // Fetch message token
      const { data: messageData, error: messageError } = await useFetch<MessageResponse>('/message', {
        baseURL: baseUrl,
        headers: authHeaders().headers,
        credentials: 'include',
      });

      // Check if the request was successful
     if (messageError.value || !messageData.value?.metadata?.token) {
        throw new Error('Failed to fetch message token');
      }

      const token = messageData.value.metadata.token;
      const signedMessage = await signer.signMessage(token);

      const commonData = {
        message: token,
        signedMessage,
        address: signer.address,
      };

      const path = userId ? "register-wallet" : "metamask";


      // Post signed message
      const { data: walletData, error: walletError } = await useFetch<WalletResponse>(`/${path}`, {
        baseURL: baseUrl,
        method: 'POST',
        headers: authHeaders().headers,
        credentials: 'include',
        body: commonData,
      });



      if (walletError.value || !walletData.value) {
        throw new Error('Failed to link wallet');
      }

      await provider.destroy();

      provider.destroy();
      if (userId) userStore.setWallet(signer.address);
      console.log({ userId, content: walletData.value });
      return {
        user: walletData.value.data,
        address: signer.address,
        accessToken: walletData.value.metadata.accessToken,
      };
      } catch (err: any) {
        console.error('Metamask error:', err);
        // If signer exists, try to set wallet address in case of partial success
        if (err.address) {
          await userStore.setWallet(err.address);
          return { address: err.address };
        }
        throw err; // Propagate error to caller
      
    } finally {
      loading.value = false;
    }
  };

  const unlinkWallet = async () => {
    try {
      await userStore.setWallet(null);
    } catch (err) {
      console.error('Unlink wallet error:', err);
      throw err; // Propagate error to caller
    }
  };

  return { linkWallet, unlinkWallet, loading };
};
