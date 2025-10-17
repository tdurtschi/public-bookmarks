import { useState, useEffect } from 'react'
import Avatar from './Avatar'
import Header from './components/Header'
import { useDependencyInjection } from './DependencyInjectionContext';
export default function Account({ session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const { apiClient } = useDependencyInjection();

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const { data, error } = await apiClient.getMyProfile();
      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
          setAvatarUrl(data.avatar_url)
        }
      }
      setLoading(false)
    }
    getProfile()
    return () => {
      ignore = true
    }
  }, [])
  async function updateProfile(event, avatarUrl) {
    event.preventDefault()
    setLoading(true)
    const updates = {
      username,
      avatar_url: avatarUrl,
      updated_at: new Date(),
    }
    const { error } = await apiClient.updateMyProfile(updates);
    if (error) {
      alert(error.message)
    } else {
      setAvatarUrl(avatarUrl)
    }
    setLoading(false)
  }
  return (
    <>
      <Header/>  
      <h1>My Account</h1>
      <form onSubmit={updateProfile} className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            required
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <Avatar
          url={avatar_url}
          size={150}
          onUpload={(event, url) => {
              updateProfile(event, url)
          }}
        />
        <div>
          <button className="button block primary" type="submit" disabled={loading}>
            {loading ? 'Loading ...' : 'Update'}
          </button>
        </div>
      </form>
    </>
  )
}