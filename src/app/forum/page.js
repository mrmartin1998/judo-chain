"use client";

import React, { useEffect, useState } from 'react';
import web3 from '../utils/web3';
import { forumContract, judokaRegistryContract } from '../utils/contract';
import Navbar from '../components/Navbar';
import Link from 'next/link';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      const postCount = await forumContract.methods.postCount().call();
      const postArray = [];
      for (let i = 1; i <= postCount; i++) {
        const post = await forumContract.methods.posts(i).call();
        const author = await judokaRegistryContract.methods.getJudoka(post.author).call();
        postArray.push({ ...post, authorName: `${author.firstName} ${author.lastName}` });
      }
      setPosts(postArray);
    };

    const loadAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    };

    loadPosts();
    loadAccount();
  }, []);

  const createPost = async () => {
    await forumContract.methods.createPost(title, content).send({ from: account });
    setTitle('');
    setContent('');
    const postCount = await forumContract.methods.postCount().call();
    const postArray = [];
    for (let i = 1; i <= postCount; i++) {
      const post = await forumContract.methods.posts(i).call();
      const author = await judokaRegistryContract.methods.getJudoka(post.author).call();
      postArray.push({ ...post, authorName: `${author.firstName} ${author.lastName}` });
    }
    setPosts(postArray);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 flex-grow">
        <div className="bg-white p-8 shadow rounded-lg">
          <h1 className="text-3xl font-bold mb-6 text-black">Forum</h1>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4 text-black">Create Post</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm mb-4"
              style={{ color: 'black', backgroundColor: 'white' }}
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="mt-1 block w-full h-24 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              style={{ color: 'black', backgroundColor: 'white' }}
            />
            <button
              onClick={createPost}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            >
              Submit
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black">Posts</h2>
            {posts.map((post, index) => (
              <div key={index} className="mb-6">
                <div className="bg-gray-200 p-6 rounded shadow">
                  <h3 className="text-xl font-bold text-black mb-2">{post.title}</h3>
                  <p className="text-black mb-4">{post.content}</p>
                  <Link href={`/profile/${post.author}`} className="text-sm text-gray-600 mb-4">
                    by {post.authorName}
                  </Link>
                  <Post postId={post.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

const Post = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadComments = async () => {
      const postComments = await forumContract.methods.getPostComments(postId).call();
      const commentsWithAuthors = await Promise.all(
        postComments.map(async (comment) => {
          const author = await judokaRegistryContract.methods.getJudoka(comment.author).call();
          return { ...comment, authorName: `${author.firstName} ${author.lastName}` };
        })
      );
      setComments(commentsWithAuthors);
    };

    loadComments();
  }, [postId]);

  const createComment = async () => {
    const accounts = await web3.eth.getAccounts();
    await forumContract.methods.createComment(postId, content).send({ from: accounts[0] });
    setContent('');
    const postComments = await forumContract.methods.getPostComments(postId).call();
    const commentsWithAuthors = await Promise.all(
      postComments.map(async (comment) => {
        const author = await judokaRegistryContract.methods.getJudoka(comment.author).call();
        return { ...comment, authorName: `${author.firstName} ${author.lastName}` };
      })
    );
    setComments(commentsWithAuthors);
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-bold mb-2 text-black">Comments</h4>
      {comments.map((comment, index) => (
        <div key={index} className="bg-gray-100 p-4 rounded mb-4 shadow">
          <p className="text-black">{comment.content}</p>
          <Link href={`/profile/${comment.author}`} className="text-sm text-gray-600 mb-4">
            by {comment.authorName}
          </Link>
        </div>
      ))}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="mt-1 block w-full h-20 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        style={{ color: 'black', backgroundColor: 'white' }}
      />
      <button
        onClick={createComment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default Forum;
