import { useConnectWallet, Web3OnboardProvider } from '@subwallet-connect/react';
import { init } from '@subwallet-connect/react';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'react-use';
import type { WalletState } from '@subwallet-connect/core';
import polkadotJs from '@subwallet-connect/polkadot-js';
import subwalletPolkadot from '@subwallet-connect/subwallet-polkadot';
import talisman from '@subwallet-connect/talisman';
import { InjectedAccount, Props } from 'typink';

interface SubConnectV2ContextProps {
  wallet: WalletState | null;
  connectedAccount?: InjectedAccount;
  setConnectedAccount: (account?: InjectedAccount) => void;
  connectWallet: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const SubConnectV2Context = createContext<SubConnectV2ContextProps>({} as any);

export const useSubConnectV2 = () => {
  return useContext(SubConnectV2Context);
};

interface SubConnectV2ProviderProps extends Props {}

export const SubConnectV2Provider = ({ children }: SubConnectV2ProviderProps) => {
  return (
    <Web3OnboardProvider web3Onboard={onboardWallets}>
      <SubConnectV2Setup>{children}</SubConnectV2Setup>
    </Web3OnboardProvider>
  );
};

export const SubConnectV2Setup = ({ children }: SubConnectV2ProviderProps) => {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [connectedAccount, setConnectedAccount, removeConnectedAccount] =
    useLocalStorage<InjectedAccount>('CONNECTED_ACCOUNT');

  const signOut = async () => {
    if (!wallet) return;

    await disconnect(wallet);
    removeConnectedAccount();
  };

  const connectWallet = async () => {
    await connect();
  };

  return (
    <SubConnectV2Context.Provider
      value={{
        wallet,
        connectWallet,
        connectedAccount,
        setConnectedAccount,
        signOut,
      }}>
      {children}
    </SubConnectV2Context.Provider>
  );
};

export const onboardWallets = init({
  theme: 'dark',
  appMetadata: {
    name: 'Typink Dapp',
    recommendedInjectedWallets: [
      {
        name: 'SubWallet',
        url: 'https://subwallet.app',
      },
    ],
  },
  wallets: [
    subwalletPolkadot(), // prettier-end-here
    talisman(),
    polkadotJs(),
  ],
  connect: {
    autoConnectLastWallet: true,
    autoConnectAllPreviousWallet: true,
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  chains: [],
  chainsPolkadot: [
    {
      id: '0x68d56f15f85d3136970ec16946040bc1752654e906147f7e43e9d539d7c3de2f',
      label: 'Polkadot Asset Hub',
      namespace: 'substrate',
      decimal: 10,
      token: 'DOT',
      blockExplorerUrl: 'assethub-polkadot.subscan.io',
    },
  ],
});
