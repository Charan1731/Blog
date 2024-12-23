import React from 'react';
import { Clock, User } from 'lucide-react';
import { Blog } from '../types/Blog';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" />
          <span>{blog.author}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{new Date(blog.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;