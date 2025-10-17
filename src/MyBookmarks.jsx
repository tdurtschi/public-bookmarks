import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import BookmarkList from './components/BookmarkList'
import Header from './components/Header'

export default function MyBookmarks({ session }){
    var [myBookmarks, setMyBookmarks] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = session
    useEffect(() => {
            let ignore = false
            async function getMyBookmarks() {
              setLoading(true)
              const { data, error } = await supabase
                .from('bookmark')
                .select(`id, url, title, description`)
                .eq('user_id', user.id);
              if (!ignore) {
                if (error) {
                  console.warn(error)
                } else if (data) {
                  setMyBookmarks(data)
                }
              }
              setLoading(false)
            }
            getMyBookmarks()
            return () => {
              ignore = true
            }
          }, [])

    const createBookmark = async (event) => {
        console.log("Creating bookmark")
        event.preventDefault()
        setLoading(true);
        const { data, error } = await supabase
            .from('bookmark')
            .insert([
                { title: newTitle, url: newUrl, description: newDescription, user_id: user.id },
            ]);
        if (error) {
            alert(error.message);
        } else {             
            setNewTitle('');    
            setNewDescription('');
            setNewUrl('');

            const { data, error } = await supabase
            .from('bookmark')
            .select(`id, url, title, description`)
            .eq('user_id', user.id);
          
            if (error) {
              console.warn(error)
            } else if (data) {
              setMyBookmarks(data)
            }
        }
        window.location.reload();
        setLoading(false);
    }

    return (
        <>
            <Header session={session} />
            <h1>My Bookmarks</h1>
            <form onSubmit={createBookmark}>
                Add a new bookmark:
                <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                <input type="text" placeholder="URL" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} />
                <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                <button type="submit" disabled={loading}>{loading ? "Loading..." : "Add Bookmark"}</button>
            </form> 
            <BookmarkList bookmarks={myBookmarks} />
        </>
    )
}