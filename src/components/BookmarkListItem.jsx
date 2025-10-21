import TagContainer from "./TagContainer";

export default function BookmarkListItem({
  bookmark,
  onDelete,
  onUpdate,
  canEdit = false,
}) {
  return (
    <li key={bookmark.id}>
      <strong>
        <a href={bookmark.url} target="_blank">
          {bookmark.title}
        </a>
      </strong>
      <div>
        <a href={bookmark.url} className="truncate" target="_blank" rel="noopener noreferrer">
          {bookmark.url}
        </a>
      </div>
      {bookmark.description ? (
        <div className="bookmark-description">{bookmark.description}</div>
      ) : (
        <></>
      )}
      <TagContainer
        bookmarkId={bookmark.id}
        canEdit={canEdit}
        onUpdate={onUpdate}
        selectedTagIds={bookmark.tags || []}
      />
      {canEdit ? (
        <button onClick={() => onDelete(bookmark.id)}>
          Delete Bookmark
        </button>
      ) : (
        <></>
      )}
    </li>
  );
}
