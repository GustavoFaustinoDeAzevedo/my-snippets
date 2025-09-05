'use client';

import React, { useState, useEffect } from 'react';

const PlaceholderAPI = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts'
        );
        if (!response.ok) {
          throw new Error(`Erro na rede: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // O array vazio [] garante que a função só rode uma vez, ao montar o componente

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="mx-auto max-w-2xl max-h-screen p-8 border rounded-md border-gray-300 dark:border-gray-600 overflow-y-auto scroll-smooth ">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-500 ">
        Posts da Placeholder API
      </h2>
      <ul className="font-mono list-inside flex flex-col gap-6 text-sm/6 text-center sm:text-left">
        {posts.map((post: any) => (
          <li
            key={post.id}
            className="flex flex-col gap-4 mb-2 tracking-[-.01em]  hover:bg-gray-100 dark:hover:bg-gray-800 p-4 rounded-md"
          >
            <h3 className="font-bold text-lg text-blue-600! dark:text-blue-500!">
              {post.title}
            </h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceholderAPI;
