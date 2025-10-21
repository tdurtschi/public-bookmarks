import CreatableSelect from "react-select/creatable";
import Select from "react-select";
import { useContext, useMemo } from "react";
import { TagsContext } from "../TagsContext";

export default function TagMultiSelect({
  selectedTagIds,
  onChange,
  canCreate,
  onCreateOption,
  placeholder,
}) {
  const { tags: allTags, loading: tagsLoading } = useContext(TagsContext);
  const options = useMemo(
    () => allTags.map((tag) => ({ value: tag.id, label: tag.tag_name })),
    [allTags]
  );
  const selectedValues = useMemo(
    () =>
      options.filter(
        (tag) => selectedTagIds?.findIndex((st) => st == tag.value) > -1
      ),
    [selectedTagIds, options]
  );

  const onChangeInternal = (newValue) => {
    onChange(newValue.map((v) => v.value));
  };

  if (!canCreate) {
    return (
      <Select
        isMulti
        options={options}
        value={selectedValues}
        placeholder={tagsLoading ? "loading..." : placeholder}
        onChange={onChangeInternal}
      />
    );
  }

  return (
    <CreatableSelect
      isMulti
      options={options}
      value={selectedValues}
      placeholder={tagsLoading ? "loading..." : placeholder}
      onChange={onChangeInternal}
      onCreateOption={onCreateOption}
    />
  );
}
