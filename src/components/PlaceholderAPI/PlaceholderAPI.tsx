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
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  const capitalizeFirstLetter = (string: string): string => {
    if (!string) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="placeholderAPI__container">
      <h2 className="placeholderAPI__container-title">
        Posts da Placeholder API
      </h2>
      <ul className="placeholderAPI__container-list">
        {posts.map((post: any) => (
          <li key={post.id} className="placeholderAPI__container-list-item">
            <h3 className="placeholderAPI__container-list-item-title">
              {capitalizeFirstLetter(post.title)}
            </h3>
            <p className="placeholderAPI__container-list-item-text">
              {capitalizeFirstLetter(post.body)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceholderAPI;
