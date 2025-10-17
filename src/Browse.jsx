import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

export default function Browse() {
    const [loading, setLoading] = useState(true)
    const [profiles, setProfiles] = useState([])

     useEffect(() => {
        let ignore = false
        async function getAllProfiles() {
          setLoading(true)
          const { data, error } = await supabase
            .from('profiles')
            .select(`username, avatar_url`)
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
                    </div>
                ))}
            </>}
        </>
    )
}