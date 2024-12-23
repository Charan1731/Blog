import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { WalletIcon, LogOut } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="flex items-center">
      {isConnected ? (
        <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-lg">
          <WalletIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-600">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
          {/* Disconnect Button */}
          <button
            onClick={onDisconnect}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Disconnect</span>
          </button>
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <WalletIcon className="h-5 w-5" />
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};

const WalletConnectContainer: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const onConnect = async () => {
    if (window.ethereum) {
      try {
        // Request account access from MetaMask
        const [address] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        // Set the connection state
        setIsConnected(true);
        setWalletAddress(address);
      } catch (error) {
        console.error('User denied account access or error occurred:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const onDisconnect = () => {
    setIsConnected(false);
    setWalletAddress('');
    // Optional: You can also reset or remove any provider or other connection-related state
    alert('Wallet disconnected');
  };

  return (
    <WalletConnect
      isConnected={isConnected}
      walletAddress={walletAddress}
      onConnect={onConnect}
      onDisconnect={onDisconnect}
    />
  );
};

export default WalletConnectContainer;
