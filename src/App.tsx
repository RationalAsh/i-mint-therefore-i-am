import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDialogProvider, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useCallback, useMemo } from 'react';

import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/navigation/AppBar';
import { Box, Container, Stack } from '@mui/material';
import MintCard from './components/MintCard';
import Minter from './components/Minter';

import{ useSnackbar } from 'notistack'
import { MetaplexProvider } from './components/minting/MetaplexProvider';
import MintForm from './components/minting/MintForm';

const Context: FC<{ children: ReactNode }> = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  // const network = WalletAdapterNetwork.Devnet;
  const network = WalletAdapterNetwork.Testnet;

  // You can also provide a custom RPC endpoint.
  // const endpoint = "http://localhost:8899";
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
  // Only the wallets you configure here will be compiled into your application, and only the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
      () => [
          new PhantomWalletAdapter(),
          new SolanaMobileWalletAdapter(
            {   appIdentity: {name: "I Mint, Therefore I Am"}, 
                authorizationResultCache: createDefaultAuthorizationResultCache(),
                cluster: network
            })
      ],
      [network]
  );

    const { enqueueSnackbar } = useSnackbar();
    const onError = useCallback(
        (error: WalletError) => {
            enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });
            console.error(error);
        },
        [enqueueSnackbar]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect onError={onError}>
                <WalletDialogProvider>
                    <MetaplexProvider>
                    {children}
                    </MetaplexProvider>
                </WalletDialogProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

const Content: FC = () => {
  return (
      <div className="App">
          <ResponsiveAppBar/>
          <Stack alignItems='center' spacing={2} sx={{ mt: 2 }}>
            <MintForm/>
          </Stack>
      </div>
  );
};

const App: FC = () => {
  return (
      <Context>
          <Content />
      </Context>
  );
};

export default App;
