import React from 'react';
import CreateBlog from './CreateBlog';

const ParentComponent: React.FC = () => {
  const handleBlogSubmit = async (title: string, content: string) => {
    try {
      // Simulate an API call or blockchain transaction
      console.log("Submitting blog:", title, content);
      // Add your logic to save the blog post here (e.g., call an API or smart contract)
    } catch (error) {
      console.error("Error submitting blog:", error);
      throw new Error("Failed to publish blog.");
    }
  };

  return <CreateBlog onSubmit={handleBlogSubmit} />;
};

export default ParentComponent;
