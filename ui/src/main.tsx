import { ChakraProvider } from '@chakra-ui/react';
import { useConnectWallet } from '@subwallet-connect/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from '@/App';
import { AppProvider } from '@/providers/AppProvider.tsx';
import { SubConnectV2Provider, useSubConnectV2 } from '@/providers/SubConnectV2Provider.tsx';
import { theme } from '@/theme';
import { deployments } from 'contracts/deployments';
import { TypinkProvider, development, alephZeroTestnet, popTestnet } from 'typink';

const DEFAULT_CALLER = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'; // Alice
const SUPPORTED_NETWORKS = [popTestnet, alephZeroTestnet];
if (process.env.NODE_ENV === 'development') {
  SUPPORTED_NETWORKS.push(development);
}

function TypinkApp() {
  const { wallet, connectedAccount } = useSubConnectV2();

  return (
    <ChakraProvider theme={theme}>
      <TypinkProvider
        appName='Typink Dapp'
        deployments={deployments}
        defaultCaller={DEFAULT_CALLER}
        defaultNetworkId={popTestnet.id}
        supportedNetworks={SUPPORTED_NETWORKS}
        signer={wallet?.signer}
        connectedAccount={connectedAccount}>
        <AppProvider>
          <App />
          <ToastContainer
            position='top-right'
            closeOnClick
            pauseOnHover
            theme='light'
            autoClose={5_000}
            hideProgressBar
            limit={2}
          />
        </AppProvider>
      </TypinkProvider>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <SubConnectV2Provider>
    <TypinkApp />
  </SubConnectV2Provider>,
);
