import React, { useState } from 'react';
import { PenSquare } from 'lucide-react';

interface CreateBlogProps {
  onSubmit: (title: string, content: string) => Promise<void>; // Assuming onSubmit is asynchronous
}

const CreateBlog: React.FC<CreateBlogProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // Add loading state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);  // Show loading state
    setSuccessMessage(''); // Clear any previous success message
    setErrorMessage('');   // Clear any previous error message
    
    try {
      await onSubmit(title, content);
      setSuccessMessage('Blog successfully published!');  // Show success message
      setTitle('');
      setContent('');
    } catch (error) {
      setErrorMessage('Failed to publish blog. Please try again later.');  // Show error message
    } finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 text-sm">{successMessage}</div>}
      <button
        type="submit"
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={isLoading}  // Disable button when loading
      >
        {isLoading ? (
          <span>Loading...</span> // Show loading state text
        ) : (
          <>
            <PenSquare className="h-5 w-5" />
            <span>Publish Blog</span>
          </>
        )}
      </button>
    </form>
  );
};

export default CreateBlog;
