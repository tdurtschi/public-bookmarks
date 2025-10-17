import BookmarkListItem from "./BookmarkListItem";

export default function BookmarkList({ bookmarks }) {
  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
      ))}
    </ul>
  );
}
