import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletDialogProvider, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import {
    PhantomWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import React, { FC, ReactNode, useMemo } from 'react';

import logo from './logo.svg';
import './App.css';
import ResponsiveAppBar from './components/AppBar';

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
          new PhantomWalletAdapter()
      ],
      [network]
  );

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletDialogProvider>
                  {children}
              </WalletDialogProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
};

const Content: FC = () => {
  return (
      <div className="App">
          <ResponsiveAppBar/>
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
