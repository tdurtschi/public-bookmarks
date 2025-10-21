import { useContext, useState } from "react";
import TagMultiSelect from "./TagMultiSelect";
import { useDependencyInjection } from "../DependencyInjectionContext";
import { TagsContext } from "../TagsContext";

function BookmarkTag({ tag }) {
  return <span className="bookmark-tag">{tag}</span>;
}

function AddTagButton({ onAddTag }) {
  return (
    <button
      type="button"
      onClick={onAddTag}
      className="bookmark-tag bookmark-tag-add"
    >
      + Add/Edit Tags
    </button>
  );
}

function EditTagsForm({ bookmarkId, onClose, selectedTagIds }) {
  const { apiClient } = useDependencyInjection();
  const { onCreateTag } = useContext(TagsContext);
  const [loading, setLoading] = useState(false);
  const [newSelectedTagIds, setNewSelectedTagIds] = useState(
    selectedTagIds || []
  );
  const onSelectedTagsChanged = (newSelectedTagIds) => {
    setNewSelectedTagIds(newSelectedTagIds);
    console.log("Selected tags changed:", newSelectedTagIds);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await apiClient.updateBookmarkTags(bookmarkId, newSelectedTagIds);
    setLoading(false);
    onClose();
  };

  const createTag = async (inputValue) => {
    const { data, error } = await onCreateTag(inputValue);

    if (!error) {
      onSelectedTagsChanged([...newSelectedTagIds, data.id]);
    } else {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <div className="card" style={{margin: "12px 0px"}}>
      <form onSubmit={onSubmit} className="new-tag-form">
        <div>
          <label htmlFor="tag">Add/Edit Tags*</label>
          <TagMultiSelect
            selectedTagIds={newSelectedTagIds}
            onChange={onSelectedTagsChanged}
            onCreateOption={createTag}
          />
        </div>
        <button
          type="submit"
          className="pill"
          style={{ marginTop: "12px" }}
          disabled={loading}
        >
          {loading ? "loading..." : "Save"}
        </button>
      </form>
    </div>
  );
}

function TagContainer({ bookmarkId, selectedTagIds, canEdit, onUpdate }) {
  const { tags: allTags, loading: tagsLoading } = useContext(TagsContext);
  const [showTagForm, setShowTagForm] = useState(false);

  function onAddTag(event) {
    event.preventDefault();
    setShowTagForm(true);
  }

  function onCloseNewTagForm() {
    setShowTagForm(false);
    onUpdate();
  }

  function getTagById(id) {
    if (tagsLoading) {
      return "loading...";
    }
    return allTags?.find((tag) => tag.id === id);
  }

  return (
    <>
      {showTagForm ? (
        <EditTagsForm
          onClose={onCloseNewTagForm}
          selectedTagIds={selectedTagIds}
          bookmarkId={bookmarkId}
        />
      ) : (
        <div className="tag-container">
          {selectedTagIds.map((id, index) => (
            <BookmarkTag key={index} tag={getTagById(id)?.tag_name} />
          ))}
          {canEdit ? <AddTagButton onAddTag={onAddTag}></AddTagButton> : null}
        </div>
      )}
    </>
  );
}

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
