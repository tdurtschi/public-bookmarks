import { useState, useEffect } from "react";
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
      <Header isAnonymous={session == null}/>
      {loading ? (
        "Loading ..."
      ) : (
        <>
          {profiles.map((profile) => {
            var bookmarksForThisUser = bookmarks.filter((b) => b.user_id === profile.id)
            if(bookmarksForThisUser.length === 0) {
              return null;
            }
            var username = profile.username && profile.username.length > 0 ? profile.username : "anonymous user";

            return (
              <div key={profile.id} style={{ marginBottom: "36px" }}>
                <h2>{username}</h2>
                <BookmarkList
                  bookmarks={bookmarksForThisUser}
                />
              </div>
              )
            }
          )}
        </>
      )}
    </>
  );
}
