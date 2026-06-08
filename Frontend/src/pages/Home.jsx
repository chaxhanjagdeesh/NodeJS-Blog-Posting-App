import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";

function Home() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await api.get("/");
                setPosts(res.data.posts || []);
                setUser(res.data.user);
            } catch (err) {
                console.log(err);
            }
        }
        fetchPosts();
    }, []);

    return (
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white min-h-screen">
            <Navbar user={user} />
            <main className="max-w-3xl mx-auto px-5 py-10">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-4xl font-bold">
                            Latest Posts
                        </h2>
                        <p className="text-zinc-400 mt-1">
                            Read what people are sharing today.
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    {
                        posts.map(post => (
                            <PostCard
                                key={post._id}
                                post={post}
                                user={user}
                            />
                        ))
                    }
                </div>
            </main>
        </div>
    );
}

export default Home;