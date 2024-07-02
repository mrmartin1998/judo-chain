"use client";

import React from 'react';
import Navbar from '../components/Navbar';
import Forum from '../components/Forum';

const ForumPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
        <Forum allowPostCreation={true} />
      </main>
    </div>
  );
};

export default ForumPage;
