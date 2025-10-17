import BookmarkListItem from "./BookmarkListItem";

export default function BookmarkList({ bookmarks, canDelete, onDelete}) {
  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} canDelete={canDelete} onDelete={onDelete}/>
      ))}
    </ul>
  );
}
