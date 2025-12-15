import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    await axios.post("http://127.0.0.1:5000/blogs", {
      title,
      content,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Create Blog</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Blog title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3 rounded h-40"
          placeholder="Write your content..."
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
