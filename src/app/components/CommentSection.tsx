"use client";
import React, { useState } from "react";
import { FaHeart, FaThumbsUp, FaReply } from "react-icons/fa"; 

const CommentSection = () => {
  const [comments, setComments] = useState<{ text: string; liked: boolean; hearted: boolean; replies: string[] }[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null); 
  const [newReply, setNewReply] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        { text: newComment, liked: false, hearted: false, replies: [] },
      ]);
      setNewComment("");
    }
  };

  const handleLike = (index: number) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, liked: !comment.liked } : comment
      )
    );
  };

  const handleHeart = (index: number) => {
    setComments((prevComments) =>
      prevComments.map((comment, i) =>
        i === index ? { ...comment, hearted: !comment.hearted } : comment
      )
    );
  };

  const handleReply = (index: number) => {
    setReplyTo(index);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReply.trim() && replyTo !== null) {
      const updatedComments = [...comments];
      updatedComments[replyTo].replies.push(newReply);
      setComments(updatedComments);
      setNewReply(""); 
      setReplyTo(null); 
    }
  };

  return (
    <div className="mt-8 p-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={4}
          className="w-full p-2 rounded-lg  text-gray-700 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          style={{ resize: "none", boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)" }}
        />
        <hr className="border-gray-300 dark:border-gray-600" />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Post Comment
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">All Comments</h3>
        <div className="mt-4 space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-2">
              <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              <div className="flex items-center space-x-4 mt-2">
                <div
                  onClick={() => handleLike(index)}
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-600"
                >
                  <FaThumbsUp color={comment.liked ? "blue" : "gray"} />
                  <span className="ml-1">{comment.liked ? "Liked" : "Like"}</span>
                </div>
                <div
                  onClick={() => handleHeart(index)}
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-600"
                >
                  <FaHeart color={comment.hearted ? "red" : "gray"} />
                  <span className="ml-1">{comment.hearted ? "Hearted" : "Heart"}</span>
                </div>
                <div
                  onClick={() => handleReply(index)}
                  className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-green-600"
                >
                  <FaReply />
                  <span className="ml-1">Reply</span>
                </div>
              </div>

              {replyTo === index && (
                <form onSubmit={handleReplySubmit} className="mt-4">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-100"
                  />
                  <button
                    type="submit"
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
                  >
                    Post Reply
                  </button>
                </form>
              )}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-2 pl-6">
                  {comment.replies.map((reply, replyIndex) => (
                    <div key={replyIndex} className="p-2">
                      <p className="text-gray-700 dark:text-gray-300">{reply}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
