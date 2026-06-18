import api from "../services/api";
import { useState } from "react";
import { Trash2 } from "lucide-react";

function CommentSection({ comments, post, user }) {
  const [content, setContent] = useState("");
  const [allComments, setAllComments] = useState(comments);
  console.log();
  async function handleComment() {
    if (!content.trim()) return;
    try {
      const { data } = await api.post(`/api/comment/${post._id}`, {
        content,
      });
      setAllComments([...allComments, data.comment]);
      setContent("");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      const data = await api.delete(`/api/comment/${commentId}`);
      setAllComments(
        allComments.filter((comment) => comment._id !== commentId),
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="mt-5 border-t border-zinc-800 pt-5">
      <div className="space-y-4">
        {user && (
          <div className="flex gap-3 mb-5">
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500 text-sm"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <button
              onClick={handleComment}
              type="button"
              className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-700 transition text-sm font-semibold"
            >
              Post
            </button>
          </div>
        )}

        {allComments.length > 0 ? (
          allComments.map((comment) => (
            <div key={comment._id} className="bg-zinc-800/70 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={`http://localhost:3000/images/${comment.user?.profilePic}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-sm">
                      {comment.user?.name}
                      {comment.user?._id === post.user?._id && (
                        <span className="text-zinc-400 text-xs ml-2">
                          (Author)
                        </span>
                      )}
                    </h4>

                    <p className="text-zinc-400 text-xs">
                      @{comment.user?.username}
                    </p>
                  </div>
                </div>

                {comment.user?._id === user?._id && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:text-red-500 hover:bg-zinc-700 transition"
                    title="Delete comment"
                  >
                    <Trash2 size={20} strokeWidth={2} />
                  </button>
                )}
              </div>

              <p className="text-sm text-zinc-200">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500">No comments yet.</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
