function CommentSection({ comments, post }) {

    return (

        <div className="mt-5 border-t border-zinc-800 pt-5">

            <div className="space-y-4">

                {
                    comments.length > 0 ? (

                        comments.map(comment => (

                            <div
                                key={comment._id}
                                className="bg-zinc-800/70 rounded-xl p-4"
                            >

                                <div className="flex items-center gap-3 mb-2">

                                    <img
                                        src={`http://localhost:3000/images/${comment.user?.profilePic}`}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div>

                                        <h4 className="font-semibold text-sm">

                                            {comment.user?.name}

                                            {
                                                comment.user?._id === post.user?._id && (
                                                    <span className="text-zinc-400 text-xs ml-2">
                                                        (Author)
                                                    </span>
                                                )
                                            }

                                        </h4>

                                        <p className="text-zinc-400 text-xs">
                                            @{comment.user?.username}
                                        </p>

                                    </div>

                                </div>

                                <p className="text-sm text-zinc-200">
                                    {comment.content}
                                </p>

                            </div>

                        ))

                    ) : (

                        <p className="text-center text-zinc-500">
                            No comments yet.
                        </p>

                    )
                }

            </div>

        </div>

    );

}

export default CommentSection;