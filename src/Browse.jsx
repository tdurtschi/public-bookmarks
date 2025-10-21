import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import BookmarkList from "./components/BookmarkList";
import { useDependencyInjection } from "./DependencyInjectionContext";
import TagMultiSelect from "./components/TagMultiSelect";

export default function Browse({ session }) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [filteredTagIds, setFilteredTagIds] = useState([]);

  const displayBookmarks = useMemo(
    () => bookmarks.filter((b) => isSubset(b.tags, filteredTagIds)),
    [bookmarks, filteredTagIds],
  );

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
      <Header isAnonymous={session == null} />
      {loading ? (
        "Loading ..."
      ) : (
        <>
          <div>
            <TagMultiSelect
              canCreate={false}
              onChange={setFilteredTagIds}
              selectedTagIds={filteredTagIds}
              placeholder={"Filter by tags..."}
            />
          </div>
          {profiles.map((profile) => {
            var bookmarksForThisUser = displayBookmarks.filter(
              (b) => b.user_id === profile.id,
            );
            if (bookmarksForThisUser.length === 0) {
              return null;
            }
            var username =
              profile.username && profile.username.length > 0
                ? profile.username
                : "anonymous user";

            return (
              <div key={profile.id} style={{ marginBottom: "36px" }}>
                <h2>{username}</h2>
                <BookmarkList bookmarks={bookmarksForThisUser} />
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

function isSubset(b, a) {
  for (let i = 0; i < a.length; i++) {
    if (!(b.findIndex((b) => b == a[i]) > -1)) {
      return false;
    }
  }
  return true;
}
