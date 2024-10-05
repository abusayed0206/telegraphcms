"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const HomePage = () => {
  interface Post {
    path: string;
    title: string;
    description: string;
    author_name?: string;
    views: number;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async (page: number) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/page/${page}`);
        const data = await res.json();
        setPosts(data.pages);
        setTotalCount(data.total_count);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    };

    fetchPosts(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalCount / 10);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Show 5 pages at a time
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`px-4 py-2 rounded ${
            currentPage === i ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex space-x-1">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded bg-gray-200 text-black"
          >
            Previous
          </button>
        )}
        {pageNumbers}
        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded bg-black text-white"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="mx-auto px-4 py-8 text-center bg-white">
      <h1 className="text-4xl font-bold mb-4 text-black">Telegraph Blog</h1>
      <p className="text-xl mb-8 text-black">Total Posts: {totalCount}</p>

      {loading ? (
        <div className="text-black">Loading...</div>
      ) : (
        <>
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post.path}
                className="bg-white shadow-md rounded-lg p-6 text-black mx-auto"
                style={{ maxWidth: "600px" }}
              >
                <Link
                  href={`/post/${post.path}`}
                  className="text-2xl font-semibold text-black hover:underline"
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-black">{post.description}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>{post.author_name || "Unknown"}</span>
                  <span>Views: {post.views}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex justify-center items-center">
            {renderPageNumbers()}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
