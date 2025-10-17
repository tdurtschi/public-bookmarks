import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Browse() {
    const [loading, setLoading] = useState(true)
    const [profiles, setProfiles] = useState([])
    const [bookmarks, setBookmarks] = useState([])

     useEffect(() => {
        let ignore = false
        async function getAllProfiles() {
          setLoading(true)
          const { data, error } = await supabase
            .from('profiles')
            .select(`username, avatar_url, id`)
          if (!ignore) {
            if (error) {
              console.warn(error)
            } else if (data) {
              setProfiles(data)
            }
          }
          setLoading(false)
        }
        getAllProfiles()
        async function getAllBookmarks() {
          setLoading(true)
          const { data, error } = await supabase
            .from('bookmark')
            .select(`title, url, description, user_id`)
          if (!ignore) {
            if (error) {
              console.warn(error)
            } else if (data) {
              setBookmarks(data)
            }
          }
          setLoading(false)
        }
        getAllBookmarks()
        return () => {
          ignore = true
        }
      }, [])

    return (
        <>
            <div>Browse All</div>
            {loading ? "Loading ..." : 
            <>
                {profiles.map(profile => (
                    <div key={profile.username} style={{marginBottom: '20px'}}>
                        <div>Username: {profile.username}</div>
                        <ul>
                          {bookmarks.filter(b => b.user_id === profile.id).map(bookmark => (
                            <li key={bookmark.url}>
                              <div>Title: {bookmark.title}</div>
                              <div>URL: <a href={bookmark.url} target="_blank" rel="noopener noreferrer">{bookmark.url}</a></div>
                              <div>Description: {bookmark.description}</div>
                            </li>
                          ))} 
                        </ul>
                    </div>
                ))}
            </>}
        </>
    )
}