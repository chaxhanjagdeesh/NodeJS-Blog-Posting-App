import { useState } from "react";
import CommentSection from "./CommentSection";

function PostCard({ post, user }) {

    const [showComments, setShowComments] = useState(false);

    return (

        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition duration-300">

            {
                post.postImg && (

                    <div className="w-full h-[250px] overflow-hidden border-b border-zinc-800">

                        <img
                            src={`http://localhost:3000/images/${post.postImg}`}
                            alt=""
                            className="w-full h-full object-cover"
                        />

                    </div>

                )
            }

            <div className="p-6">

                <div className="flex items-center gap-4 mb-5">

                    <img
                        src={`http://localhost:3000/images/${post.user?.profilePic}`}
                        className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>

                        <h3 className="text-lg font-semibold">
                            {post.user?.name}
                        </h3>

                        <p className="text-blue-400 text-sm">
                            @{post.user?.username}
                        </p>

                    </div>

                </div>

                <p className="text-zinc-200 leading-relaxed tracking-wide text-[15px]">
                    {post.content}
                </p>

                <div className="flex items-center justify-between mt-6 border-t border-zinc-800 pt-5">

                    <span className="text-zinc-500 text-sm">
                        {new Date(post.date).toDateString()}
                    </span>

                    <div className="flex items-center gap-3">

                        <span className="px-3 py-1 rounded-full bg-zinc-800 text-sm">
                            ❤️ {post.likes.length}
                        </span>

                        <button
                            onClick={() => setShowComments(!showComments)}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-cyan-600 transition text-sm"
                        >
                            Comments
                        </button>

                    </div>

                </div>

                {
                    showComments && (
                        <CommentSection
                            comments={post.comments}
                            post={post}
                        />
                    )
                }

            </div>

        </div>

    );

}

export default PostCard;