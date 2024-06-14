"use client";

import { useEffect, useState } from 'react';

export default function Forum() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchForumTopics = async () => {
      const response = await fetch('/api/forum/topics'); // Replace with actual API endpoint
      const data = await response.json();
      setTopics(data);
    };

    fetchForumTopics();
  }, []);

  return (
    <div>
      <h1>Forum Page</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic.id}>{topic.title}</li>
        ))}
      </ul>
    </div>
  );
}
