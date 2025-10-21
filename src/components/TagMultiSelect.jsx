import CreatableSelect from 'react-select/creatable';
import { useContext, useMemo } from "react";
import { TagsContext } from '../TagsContext';

export default function TagMultiSelect({selectedTagIds, onChange, canCreate, onCreateOption}) {
  const {tags: allTags, loading: tagsLoading} = useContext(TagsContext);
  const options = useMemo(() => allTags.map(tag => ({ value: tag.id, label: tag.tag_name })), [allTags]);
  const selectedValues = useMemo(() => options.filter(tag => selectedTagIds?.findIndex(st => st == tag.value) > -1), [selectedTagIds, options]);

  const onChangeInternal = (newValue) => {
    onChange(newValue.map(v => v.value));
  }

  return <CreatableSelect 
    isMulti
    options={options} 
    value={selectedValues} 
    placeholder={tagsLoading ? "loading..." : undefined} 
    onChange={onChangeInternal} 
    onCreateOption={canCreate ? onCreateOption : undefined}/>;
}
