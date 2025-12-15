import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/blogs");
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">📝 My Blog</h1>
          <Link
            to="/create"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Post
          </Link>
        </div>

        {/* Blog cards */}
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-5 rounded-lg shadow mb-4"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-700 mt-2">{blog.content}</p>

            <div className="flex gap-3 mt-4">
              <Link
                to={`/edit/${blog.id}`}
                className="text-blue-600 hover:underline"
              >
                Edit
              </Link>
              <button
                onClick={() => deleteBlog(blog.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
