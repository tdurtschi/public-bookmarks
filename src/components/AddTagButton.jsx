export default function AddTagButton({ onAddTag }) {
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
