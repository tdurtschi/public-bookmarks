import { useState, useEffect } from "react";
import BookmarkList from "./components/BookmarkList";
import Header from "./components/Header";
import { useDependencyInjection } from "./DependencyInjectionContext";
import { Link } from "react-router-dom";
import AddBookmarkForm from "./components/AddBookmarkForm";

export default function MyBookmarks() {
  const [myBookmarks, setMyBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  
  const { apiClient } = useDependencyInjection();

  useEffect(() => {
    let ignore = false;
    async function getMyBookmarks() {
      setLoading(true);
      const bookmarks = await apiClient.getMyBookmarks();
      if (!ignore) {
        setMyBookmarks(bookmarks);
      }
      const { data } = await apiClient.getMyProfile();
      if (data != null && data.username != null) {
        setHasProfile(true);
      }
      setLoading(false);
    }
    getMyBookmarks();
    return () => {
      ignore = true;
    };
  }, []);

  const onBookmarksModified = async () => {
      const data = await apiClient.getMyBookmarks();
      setMyBookmarks(data);
  }

  const deleteBookmark = async (id) => {
    const { error } = await apiClient.deleteBookmark(id);
    if (error) {
      alert(error.message);
    } else {
      await onBookmarksModified();
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
          ⚠️ Your bookmarks will show as 'anonymous user'. To add a username,
          visit <Link to="/account">My Account</Link> to set up your profile.
        </div>
      ) : null}
      <BookmarkList
        bookmarks={myBookmarks}
        canEdit={true}
        onDelete={deleteBookmark}
        onUpdate={onBookmarksModified}
      />
      <AddBookmarkForm onBookmarkCreated={onBookmarksModified} />
    </>
  );
}
