import { useState, useEffect, useContext } from "react";
import Header from "./components/Header";
import BookmarkList from "./components/BookmarkList";
import { useDependencyInjection } from "./DependencyInjectionContext";

export default function Browse({ session }) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const { apiClient } = useDependencyInjection();

  useEffect(() => {
    let ignore = false;
    async function getAllData() {
      setLoading(true);
      const profiles = await apiClient.getAllProfiles();
      const bookmarks = await apiClient.getAllBookmarks();
      if (!ignore) {
        setProfiles(profiles);
        setBookmarks(bookmarks);
      }
      setLoading(false);
    }
    getAllData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <Header/>
      <h1>All Bookmarks</h1>
      {loading ? (
        "Loading ..."
      ) : (
        <>
          {profiles.map((profile) => (
            <div key={profile.username} style={{ marginBottom: "20px" }}>
              <h2>{profile.username}</h2>
              <BookmarkList
                bookmarks={bookmarks.filter((b) => b.user_id === profile.id)}
              />
            </div>
          ))}
        </>
      )}
    </>
  );
}
