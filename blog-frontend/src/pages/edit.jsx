import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/blogs/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      });
  }, [id]);

  const update = async () => {
    await axios.put(`http://127.0.0.1:5000/blogs/${id}`, {
      title,
      content,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-2 mb-3 rounded h-40"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button
          onClick={update}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </div>
    </div>
  );
}
