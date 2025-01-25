import { createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { getWalletBySource, Wallet } from '@talismn/connect-wallets';
import { InjectedAccount, Props } from 'typink';

interface TalismanConnectContextProps {
  wallet?: Wallet;
  connectWallet: (wallet: Wallet) => Promise<void>;
  connectedAccount?: InjectedAccount;
  setConnectedAccount: (account?: InjectedAccount) => void;
  accounts: InjectedAccount[];
  signOut: () => Promise<void>;
}

export const TalismanConnectContext = createContext<TalismanConnectContextProps>({} as any);

export const useTalismanConnect = () => {
  return useContext(TalismanConnectContext);
};

interface TalismanConnectProviderProps extends Props {}

const SELECTED_WALLET_KEY = '@talisman-connect/selected-wallet-name';

export const TalismanConnectProvider = ({ children }: TalismanConnectProviderProps) => {
  const [wallet, setWallet] = useState<Wallet>();
  const [connectedAccount, setConnectedAccount, removeConnectedAccount] =
    useLocalStorage<InjectedAccount>('CONNECTED_ACCOUNT');
  const [accounts, setAccounts] = useState<InjectedAccount[]>([]);

  useEffect(() => {
    const selectedItem = localStorage.getItem(SELECTED_WALLET_KEY);
    const wallet = getWalletBySource(selectedItem);
    if (!wallet) return;

    setWallet(wallet);
  }, []);

  useEffect(() => {
    (async () => {
      if (!wallet) {
        setAccounts([]);
        return;
      }

      await wallet.enable('---');
      wallet.subscribeAccounts((walletAccounts = []) => {
        setAccounts(walletAccounts.map(({ name, address }) => ({ name, address })));
      });
    })();
  }, [wallet]);

  const signOut = async () => {
    if (!wallet) return;

    setAccounts([]);
    setWallet(undefined);
    localStorage.removeItem(SELECTED_WALLET_KEY);
    removeConnectedAccount();
  };

  const connectWallet = async (wallet: Wallet) => {
    setWallet(wallet);
  };

  return (
    <TalismanConnectContext.Provider
      value={{
        wallet,
        accounts,
        connectWallet,
        connectedAccount,
        setConnectedAccount,
        signOut,
      }}>
      {children}
    </TalismanConnectContext.Provider>
  );
};
