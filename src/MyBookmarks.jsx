import { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import Header from "./components/Header";
import { useDependencyInjection } from "./DependencyInjectionContext";
import { Link } from "react-router-dom";

export default function MyBookmarks() {
  var [myBookmarks, setMyBookmarks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiClient } = useDependencyInjection();
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    let ignore = false;
    async function getMyBookmarks() {
      setLoading(true);
      const bookmarks = await apiClient.getMyBookmarks();
      if (!ignore) {
        setMyBookmarks(bookmarks);
      }
      const { data } = await apiClient.getMyProfile();
      if (data != null) {
        setHasProfile(true);
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
      {!hasProfile && !loading ? (
        <div
          style={{
            margin: "12px 0",
            backgroundColor: "#ffdddd",
            padding: "12px",
          }}
        >
          ⚠️ Your bookmarks will show as 'anonymous user'. To add a username, visit <Link to="/account">My Account</Link> to
          set up your profile.
        </div>
      ) : null}
      <form onSubmit={createBookmark}>
        Add a new bookmark:
        <input
          type="text"
          placeholder="Title (required)"
          required
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="URL (required)"
          value={newUrl}
          required
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
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
