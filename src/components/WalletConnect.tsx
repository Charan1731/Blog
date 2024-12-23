import React from 'react';
import { BrowserProvider } from 'ethers';
import { WalletIcon } from 'lucide-react';

interface WalletConnectProps {
  isConnected: boolean;
  walletAddress: string;
  onConnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  walletAddress,
  onConnect,
}) => {
  return (
    <div className="flex items-center">
      {isConnected ? (
        <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-lg">
          <WalletIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-600">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
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

export default WalletConnect;