import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const useMetamask = (baseUrl: string) => {
  const userStore = useUserStore();

  const { authHeaders } = useAccessToken(baseUrl);
  const loading = ref(false);

  const linkWallet = async (userId?: string | number) => {
    try {
      loading.value = true;
      if (!window.ethereum) {
        // setMessage(i18n.t("pages.login.metamask.notFound"), "red", true);

        return {};
      }
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await withTimeout(12000, provider.getSigner());

      const response = await fetch(`${baseUrl}/message`, {
        headers: authHeaders().headers,
        credentials: "include",
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Message token failed");
      }

      // If successful, you can process the response here
      const data = await response.json();
      console.log({ refresh: data });
      const token = data.metadata?.token;
      const signedMessage = await signer.signMessage(token);

      const commonData = {
        message: token,
        signedMessage,
        address: signer.address,
      };

      const path = userId ? "register-wallet" : "metamask";
      console.log({ userId, path });
      try {
        const rawResponse = await fetch(`${baseUrl}/${path}`, {
          method: "POST",
          headers: authHeaders().headers,
          credentials: "include",
          body: JSON.stringify({
            ...commonData,
          }),
        });

        // Check if the request was successful
        if (!rawResponse.ok) {
          throw new Error("Message token failed");
        }
        provider.destroy();
        if (userId) userStore.setWallet(signer.address);

        const content = await rawResponse.json();

        return {
          user: content.data,
          address: signer.address,
          accessToken: content.metadata.accessToken,
        };
      } catch (err: any) {
        console.log(err);
        await userStore.setWallet(signer.address);
        return {
          address: signer.address,
        };
      }
    } catch (err: any) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  const unlinkWallet = async () => {
    try {
      await userStore.setWallet(null);
    } catch (err) {
      // setMessage(err as string, "red", true);
      console.log(err);
    }
  };

  return { linkWallet, unlinkWallet, loading };
};
