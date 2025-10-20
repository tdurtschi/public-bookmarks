import BookmarkListItem from "./BookmarkListItem";

export default function BookmarkList({ bookmarks, canDelete, onDelete}) {
  if(bookmarks.length === 0) {
    return <p><i>You don't have any bookmarks yet.</i></p>;
  } 

  return (
    <ul className="bookmark-list">
      {bookmarks.map((bookmark) => (
        <BookmarkListItem key={bookmark.id} bookmark={bookmark} canDelete={canDelete} onDelete={onDelete}/>
      ))}
    </ul>
  );
}
