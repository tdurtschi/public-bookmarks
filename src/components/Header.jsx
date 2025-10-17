import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Header({ isAnonymous }) {
  return (
    <header>
      <div className="header">
        <h1>
          <Link to="/browse">Public Bookmarks</Link>
        </h1>
        {isAnonymous ? (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "8px" }}>
            <Link to="/myBookmarks">My Bookmarks</Link>
            <Link to="/account">My Account</Link>
            <button
              className="button block"
              type="button"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
