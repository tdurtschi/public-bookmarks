import { useState } from "react";
import { useDependencyInjection } from "../DependencyInjectionContext";

export default function AddBookmarkForm({ onBookmarkCreated }) {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiClient } = useDependencyInjection();

  const createBookmark = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    const { error } = await apiClient.createBookmark(
      newTitle,
      newUrl,
      newDescription
    );

    if (error) {
      alert(error.message);
    } else {
      setNewTitle("");
      setNewDescription("");
      setNewUrl("");
      onBookmarkCreated();
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <form onSubmit={createBookmark}>
        <h2>Add a new bookmark</h2>
        <div>
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL*</label>
          <input
            type="text"
            id="url "
            value={newUrl}
            required
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "12px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
}
