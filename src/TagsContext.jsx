import { createContext } from "react";
import { useState, useEffect } from "react";
import { useDependencyInjection } from "./DependencyInjectionContext";

const defaultTagsContext = {
  tags: [],
  loading: false,
  onCreateTag: async () => { },
};

export const TagsContext = createContext(defaultTagsContext);

export function TagsContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [allTags, setAllTags] = useState([]);
  const { apiClient } = useDependencyInjection();

  useEffect(() => {
    let ignore = false;
    async function getMyTags() {
      setLoading(true);
      const tags = await apiClient.getAllTags();
      if (!ignore) {
        setAllTags(tags);
      }
      setLoading(false);
    }
    getMyTags();
    return () => {
      ignore = true;
    };
  }, []);

  const onCreateTag = async (inputValue) => {
    setLoading(true);
    const {error} = await apiClient.createTag(inputValue);
    if (error) {
      return {error}
    }

    const allTags = await apiClient.getAllTags();
    setAllTags(allTags);

    setLoading(false);

    return {data: allTags.find(tag => tag.tag_name === inputValue)};
  }

  return (
    <TagsContext.Provider value={{ tags: allTags, loading: loading, onCreateTag }}>
      {children}
    </TagsContext.Provider>
  );
}
