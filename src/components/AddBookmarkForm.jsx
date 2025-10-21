import { useContext, useState } from "react";
import { useDependencyInjection } from "../DependencyInjectionContext";
import TagMultiSelect from "./TagMultiSelect";
import { TagsContext } from "../TagsContext";

export default function AddBookmarkForm({ onBookmarkCreated }) {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const { apiClient } = useDependencyInjection();
  const { onCreateTag } = useContext(TagsContext);
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const onSelectedTagsChanged = (newSelectedTagIds) => {
    setSelectedTagIds(newSelectedTagIds);
  };

  const createTag = async (inputValue) => {
    const { data, error } = await onCreateTag(inputValue);

    if (!error) {
      onSelectedTagsChanged([...selectedTagIds, data.id]);
    } else {
      console.error("Error creating tag:", error);
    }
  };
  const createBookmark = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await apiClient.createBookmark(
      newTitle,
      newUrl,
      newDescription,
      selectedTagIds,
    );

    if (error) {
      alert(error.message);
    } else {
      setNewTitle("");
      setNewDescription("");
      setNewUrl("");
      onBookmarkCreated();
    }

    setLoading(false);
  };

  return (
    <div className="card">
      <form onSubmit={createBookmark}>
        <h2>Add a new bookmark</h2>
        <div>
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL*</label>
          <input
            type="text"
            id="url "
            value={newUrl}
            required
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description (optional)</label>
          <input
            type="text"
            id="description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (optional)</label>
          <TagMultiSelect
            selectedTagIds={selectedTagIds}
            onChange={onSelectedTagsChanged}
            onCreateOption={createTag}
          />
        </div>
        <div style={{ marginTop: "12px" }}>
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Add Bookmark"}
          </button>
        </div>
      </form>
    </div>
  );
}
