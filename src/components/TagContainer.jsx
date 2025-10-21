import { useContext, useState } from "react";
import { TagsContext } from "../TagsContext";
import BookmarkTag from "./BookmarkTag";
import AddTagButton from "./AddTagButton";
import EditTagsForm from "./EditTagsForm";

export default function TagContainer({
  bookmarkId,
  selectedTagIds,
  canEdit,
  onUpdate,
}) {
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
