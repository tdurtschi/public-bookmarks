import { useContext, useState } from "react";
import TagMultiSelect from "./TagMultiSelect";
import { useDependencyInjection } from "../DependencyInjectionContext";
import { TagsContext } from "../TagsContext";

export default function EditTagsForm({ bookmarkId, onClose, selectedTagIds }) {
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
