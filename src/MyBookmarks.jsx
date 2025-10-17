import { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import Header from "./components/Header";
import { useDependencyInjection } from "./DependencyInjectionContext";

export default function MyBookmarks() {
  var [myBookmarks, setMyBookmarks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiClient } = useDependencyInjection();

  useEffect(() => {
    let ignore = false;
    async function getMyBookmarks() {
      setLoading(true);
      const data = await apiClient.getMyBookmarks();
      if (!ignore) {
        setMyBookmarks(data);
      }
      setLoading(false);
    }
    getMyBookmarks();
    return () => {
      ignore = true;
    };
  }, []);

  const createBookmark = async (event) => {
    console.log("Creating bookmark");
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

      const data = await apiClient.getMyBookmarks();
      setMyBookmarks(data);
    }
    window.location.reload();
    setLoading(false);
  };

  const deleteBookmark = async (id) => {
    const { error } = await apiClient.deleteBookmark(id);
    if (error) {
      alert(error.message);
    } else {
      const data = await apiClient.getMyBookmarks();
      setMyBookmarks(data);
    }
  };

  return (
    <>
      <Header />
      <h1>My Bookmarks</h1>
      <form onSubmit={createBookmark}>
        Add a new bookmark:
        <input
          type="text"
          placeholder="Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Bookmark"}
        </button>
      </form>
      <BookmarkList
        bookmarks={myBookmarks}
        canDelete={true}
        onDelete={deleteBookmark}
      />
    </>
  );
}
