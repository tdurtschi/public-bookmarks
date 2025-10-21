import { supabase } from "./supabaseClient";

export default (session) => {
  return {
    getAllBookmarks: async function () {
      const { data, error } = await supabase
        .from("bookmark")
        .select(`id, title, url, description, tags, user_id`)
        .order("created_at", { ascending: true });

      if (error) {
        console.warn(error);
      }

      return data;
    },

    getMyBookmarks: async function () {
      const { user } = session;
      const { data, error } = await supabase
        .from("bookmark")
        .select(`id, url, title, description, tags`)
        .order("created_at", { ascending: true })
        .eq("user_id", user.id);

      if (error) {
        console.warn(error);
      }

      return data;
    },

    createBookmark: async function (title, url, description, tagIds) {
      const { user } = session;
      const { data, error } = await supabase.from("bookmark").insert([
        {
          title: title,
          url: url,
          description: description,
          tags: tagIds,
          user_id: user.id,
        },
      ]);
      return { data, error };
    },

    updateBookmarkTags: async function (bookmarkId, tagIds) {
      const { error } = await supabase
        .from("bookmark")
        .update({ tags: tagIds })
        .eq("id", bookmarkId);
      return { error };
    },

    getAllTags: async function () {
      const { data, error } = await supabase
        .from("tag")
        .select(`id, tag_name`)
        .order("tag_name", { ascending: true });

      if (error) {
        console.warn(error);
      }
      return data;
    },

    createTag: async function (name) {
      const { data, error } = await supabase
        .from("tag")
        .insert([{ tag_name: name }]);

      return { data, error };
    },

    deleteBookmark: async function (id) {
      const { error } = await supabase.from("bookmark").delete().eq("id", id);
      return { error };
    },

    getAllProfiles: async function () {
      const { data, error } = await supabase
        .from("profiles")
        .select(`username, avatar_url, id`)
        .order("created_at", { ascending: true });

      if (error) {
        console.warn(error);
      }

      return data;
    },

    getMyProfile: async function () {
      const { user } = session;
      const { data, error } = await supabase
        .from("profiles")
        .select(`username, avatar_url`)
        .eq("id", user.id)
        .single();

      return { data, error };
    },

    updateMyProfile: async function (updates) {
      const { error } = await supabase
        .from("profiles")
        .upsert({ id: session.user.id, ...updates });
      return { error };
    },

    downloadAvatar: async function (path) {
      return await supabase.storage.from("avatars").download(path);
    },

    uploadNewAvatar: async function (filePath, file) {
      return await supabase.storage.from("avatars").upload(filePath, file);
    },
  };
};
