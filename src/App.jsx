import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import SignIn from "./SignIn";
import "./App.css";
import "./SignIn.css";
const API = "https://698ecbe2aded595c2532d22d.mockapi.io/blogs";

const App = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // 🌙 THEME
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // 📥 FETCH DATA
  async function fetchData() {
    const res = await fetch(API);
    const json = await res.json();
    setBlogs(json.reverse());
  }

  useEffect(() => {
    fetchData();
  }, []);

  // 🔐 LOGIN (AFTER HOOKS)
  if (!user) {
    return <SignIn onLogin={setUser} />;
  }

  // ➕ CREATE
  async function createBlog() {
    if (!title || !description) {
      toast.error("Please fill all fields");
      return;
    }

    const newBlog = {
      BlogTitle: title,
      BlogDescription: description,
    };

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    });

    if (res.ok) {
      toast.success("Blog Created 🎉");
      fetchData();
      setTitle("");
      setDescription("");
    }
  }

  // ❌ DELETE
  async function deleteBlog(item) {
    await fetch(`${API}/${item.id}`, { method: "DELETE" });
    toast.success("Deleted 🗑️");
    fetchData();
  }

  // ✏️ UPDATE
  async function updateBlog(item) {
    const newTitle = prompt("Edit Title:", item.BlogTitle);
    const newDesc = prompt("Edit Description:", item.BlogDescription);

    if (!newTitle || !newDesc) return;

    await fetch(`${API}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        BlogTitle: newTitle,
        BlogDescription: newDesc,
      }),
    });

    toast.success("Updated ✨");
    fetchData();
  }

  return (
    <div className="app">
      <Toaster />

      {/* 🌙 TOGGLE */}
      <div className="top-bar">
        <span>🌙</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          <span className="slider"></span>
        </label>
        <span>☀️</span>
      </div>

      {/* HERO */}
      <div className="hero">
        <h1 className="hero-title">✨ Shriya Writes</h1>
        <p className="hero-subtitle">
          Where your ideas turn into powerful stories.
        </p>
      </div>

      {/* FORM */}
      <div className="form-card">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your story..."
        />

        <button className="create-btn" onClick={createBlog}>
          <FaPlus /> Publish
        </button>
      </div>

      {/* BLOG LIST */}
      <div className="blog-grid">
        {blogs.map((item) => (
          <div key={item.id} className="blog-card">
            <h2>{item.BlogTitle}</h2>
            <p>{item.BlogDescription}</p>

            <div className="card-buttons">
              <button onClick={() => updateBlog(item)}>
                <FaEdit /> Edit
              </button>

              <button className="delete" onClick={() => deleteBlog(item)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;