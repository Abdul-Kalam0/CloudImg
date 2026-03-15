import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

export const CommentModal = ({ image, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH COMMENTS ================= */

  const fetchComments = async () => {
    try {
      const res = await api.get(
        `/albums/${image.albumId}/images/${image.imageId}/comments`,
      );

      setComments(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image) {
      fetchComments();
    }
  }, [image]);

  /* ================= ADD COMMENT ================= */

  const addComment = async () => {
    try {
      if (!text.trim()) return;

      await api.post(
        `/albums/${image.albumId}/images/${image.imageId}/comments`,
        { text },
      );

      setText("");

      fetchComments();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error adding comment");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">Comments</h2>

          <button onClick={onClose} className="text-gray-600 hover:text-black">
            <FaTimes />
          </button>
        </div>

        {/* Comments list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && (
            <p className="text-gray-500 text-sm">Loading comments...</p>
          )}

          {!loading && comments.length === 0 && (
            <p className="text-gray-500 text-sm">No comments yet</p>
          )}

          {comments.map((c) => (
            <div
              key={c._id || c.createdAt}
              className="bg-gray-100 rounded-lg p-3"
            >
              <p className="text-sm font-semibold text-gray-700">
                {c.userEmail}
              </p>

              <p className="text-sm text-gray-600">{c.text}</p>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-3 flex gap-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={addComment}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
