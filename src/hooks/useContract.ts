import { useState, useCallback } from 'react';
import { getContract } from '../utils/contract';
import { Blog } from '../types/Blog';

export const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBlog = useCallback(async (title: string, content: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const tx = await contract.createBlog(title, content);
      await tx.wait();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create blog');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getAllBlogs = useCallback(async (): Promise<Blog[]> => {
    setLoading(true);
    setError(null);
    try {
      const contract = await getContract();
      const blogs = await contract.getAllBlogs();
      return blogs.map((blog: any) => ({
        id: blog.id.toString(),
        title: blog.title,
        content: blog.content,
        author: blog.author,
        timestamp: Number(blog.timestamp) * 1000,
        walletAddress: blog.author,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch blogs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    createBlog,
    getAllBlogs,
    loading,
    error,
  };
};