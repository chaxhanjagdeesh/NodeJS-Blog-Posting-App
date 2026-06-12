import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await api.get("/profile");
                setUser(res.data.user);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    navigate("/login");
                }else{
                    console.log(err);
                    navigate("/login"); 
                }
                // console.log(err.response);
            }
        }
        fetchUser();
    }, []);
    async function handlePostSubmit(e) {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const res = await api.post(
                "/api/post",
                formData
            );
            console.log(res.data);
           setUser(prev => ({
                ...prev,
                posts: [res.data.post, ...prev.posts]
            }));
        } catch (err) {
            console.log(err);
        }
    }

    async function handleLike(postId) {
        try {
            const res = await api.get(`/api/like/${postId}`);
            const updatedLikes = res.data.likes;
            setUser(prev => ({
                ...prev,
                posts: prev.posts.map(post => 
                    post._id === postId ? { ...post, likes: updatedLikes } : post
                )
            }));
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    
    }

    async function handleDelete(postId) {
        try {
            await api.delete(`/api/post/${postId}`);
            setUser(prev => ({
                ...prev,
                posts: prev.posts.filter(post => post._id !== postId)
            }));
            
        } catch (err) {
            console.log(err);
        }

    }

    async function handleLogout() {
        try {
            await api.get("/auth/logout");
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }
   
    if (!user) {
        return (
            <div className="text-white p-10">
                Loading...
            </div>
        );
    }


    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white min-h-screen">
            <Navbar user={user} />
            <main className="max-w-6xl mx-auto px-5 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-8 shadow-2xl shadow-black/30">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20 mb-5">
                                <img
                                    src={`http://localhost:3000/images/${user.profilePic}`}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <h2 className="text-3xl font-bold">
                                {user.name}
                            </h2>
                            <p className="text-blue-400 mt-1">
                                @{user.username}
                            </p>
                            <div className="flex gap-6 mt-6">
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold">
                                        {user.posts.length}
                                    </h3>
                                    <p className="text-zinc-400 text-sm">
                                        Posts
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="mt-6 px-5 py-2 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                    <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 mt-8 shadow-xl shadow-black/20">
                        <h3 className="text-2xl font-bold mb-2">
                            Create Post
                        </h3>
                        <p className="text-zinc-400 mb-5">
                            Share your thoughts with everyone.
                        </p>
                        <form
                            onSubmit={handlePostSubmit}
                            className="flex flex-col gap-4"
                        >
                            <input
                                type="file"
                                required
                                name="postImg"
                                className="w-full text-sm text-zinc-300
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-lg file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-500 file:text-white
                                hover:file:bg-blue-600 cursor-pointer"
                            />
                            <textarea
                                name="content"
                                required
                                placeholder="What's on your mind?"
                                className="w-full h-36 p-4 resize-none rounded-2xl bg-zinc-800 border border-zinc-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/30 transition duration-300 font-bold text-lg"
                            >
                                Post Now
                            </button>
                        </form>
                    </div>
                </div>
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <h2 className="text-4xl font-bold">
                        </h2>
                        <p className="text-zinc-400 mt-1">
                            Manage and interact with your posts.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {
                            [...user.posts].reverse().map(post => (
                                <div
                                    key={post._id}
                                    className="bg-zinc-900/70 border border-zinc-800 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 transition duration-300">
                                    {
                                        post.postImg && (
                                            <div className="w-full h-[100px] overflow-hidden border-b border-zinc-800">
                                                <img
                                                    src={`http://localhost:3000/images/${post.postImg}`}
                                                    alt=""
                                                    className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                                />
                                            </div>
                                        )
                                    }
                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-zinc-700">
                                                <img
                                                    src={`http://localhost:3000/images/${user.profilePic}`}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold">
                                                    {user.name}
                                                </h3>
                                                <p className="text-blue-400 text-sm">
                                                    @{user.username}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-zinc-200 leading-relaxed tracking-wide text-[15px]">
                                            {post.content}
                                        </p>
                                        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 border-t border-zinc-800 pt-5">
                                            <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm">
                                                ❤️ {post.likes.length} Likes
                                            </span>
                                            <div className="flex items-center gap-5 text-sm font-medium">
                                                <button onClick={() => handleLike(post._id)} className="text-blue-400 hover:text-blue-300 transition">
                                                    {
                                                      console.log(post.likes),
                                                        Array.isArray(post.likes)
                                                            ? (post.likes.some(id => id.toString() === user._id.toString())
                                                                ? "Unlike"
                                                                : "Like")
                                                            : "Invalid likes"
                                                    }
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(post._id)}
                                                    className="text-zinc-400 hover:text-red-400 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Profile;