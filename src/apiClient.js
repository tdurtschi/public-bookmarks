import { supabase } from "./supabaseClient";

export default (session) => {
  return {
    getAllBookmarks: async function () {
      const { data, error } = await supabase
        .from("bookmark")
        .select(`id, title, url, description, user_id`);

      if (error) {
        console.warn(error);
      }

      return data;

    },

    getMyBookmarks: async function () {
        const { user } = session;
        const { data, error } = await supabase
                .from('bookmark')
                .select(`id, url, title, description`)
                .eq('user_id', user.id);
        
        if (error) {       
            console.warn(error);   
        }

        return data;
    },

    createBookmark: async function (title, url, description) {
        const { user } = session;
        const { data, error } = await supabase
            .from('bookmark')
            .insert([
                { title: title, url: url, description: description, user_id: user.id },
            ]);
        return { data, error }
    },

    deleteBookmark: async function (id) {
        const { error } = await supabase
            .from('bookmark')
            .delete()
            .eq('id', id);
        return { error }
    },

    getAllProfiles: async function () {
         const { data, error } = await supabase
            .from('profiles')
            .select(`username, avatar_url, id`)

        if (error) {       
            console.warn(error);   
        }

        return data;
    },

    getMyProfile: async function() {
        const { user } = session;
        const { data, error } = await supabase
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('id', user.id)
        .single()

        return { data, error };
    },

    updateMyProfile: async function(updates) {
        const { error } = await supabase.from('profiles').upsert({id: session.user.id, ...updates})
        return { error }
    },

    downloadAvatar: async function (path) {
        return await supabase.storage.from('avatars').download(path)
    },

    uploadNewAvatar: async function (filePath, file) {
        return await supabase.storage.from('avatars').upload(filePath, file)
    }
  }
};
