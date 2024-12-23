import React, { useState, useEffect } from 'react';
import { BrowserProvider } from 'ethers';
import { PenSquare, BookOpen } from 'lucide-react';
import WalletConnect from './components/WalletConnect';
import BlogCard from './components/BlogCard';
import CreateBlog from './components/CreateBlog';
import { Blog } from './types/Blog';
import { useContract } from './hooks/useContract';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const { createBlog, getAllBlogs, loading, error } = useContract();

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        loadBlogs();
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use this feature!');
    }
  };

  const loadBlogs = async () => {
    try {
      const blogList = await getAllBlogs();
      setBlogs(blogList);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const handleCreateBlog = async (title: string, content: string) => {
    try {
      await createBlog(title, content);
      setShowCreate(false);
      await loadBlogs();
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  useEffect(() => {
    if (isConnected) {
      loadBlogs();
    }
  }, [isConnected]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Web3 Blog</h1>
            </div>
            <WalletConnect
              isConnected={isConnected}
              walletAddress={walletAddress}
              onConnect={connectWallet}
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {isConnected ? (
          <>
            {showCreate ? (
              <div className="mb-8">
                <CreateBlog onSubmit={handleCreateBlog} />
              </div>
            ) : (
              <button
                onClick={() => setShowCreate(true)}
                className="mb-8 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                disabled={loading}
              >
                <PenSquare className="h-5 w-5" />
                <span>Create New Blog</span>
              </button>
            )}
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blogs...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Connect your wallet to start blogging
            </h2>
            <p className="text-gray-600">
              Share your thoughts with the Web3 community
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;