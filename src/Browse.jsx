import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Header from './components/Header'
import BookmarkList from './components/BookmarkList'

export default function Browse( {session}) {
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
            .select(`id, title, url, description, user_id`)
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
            <Header session={session} />
            <h1>Browse All</h1>
            {loading ? "Loading ..." : 
            <>
                {profiles.map(profile => (
                    <div key={profile.username} style={{marginBottom: '20px'}}>
                        <h2>{profile.username}</h2>
                        <BookmarkList bookmarks={bookmarks.filter(b => b.user_id === profile.id)}/>
                    </div>
                ))}
            </>}
        </>
    )
}