export default function BookmarkListItem({ bookmark, onDelete, canDelete = false }) {
    return (
        <li key={bookmark.id}>
            <strong><a href={bookmark.url}>{bookmark.title}</a></strong>            
            <div><a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></div>
            {bookmark.description ? <div className="bookmark-description">- {bookmark.description}</div> : <></>}
            {canDelete ? <button className="pill" onClick={() => onDelete(bookmark.id)}>Delete</button> : <></>}
        </li>
    )
}