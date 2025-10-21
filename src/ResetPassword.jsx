import { useState } from "react";
import Header from "./components/Header";
import { supabase } from "./supabaseClient";

export default function ResetPassword({ session }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const email = session?.user?.email || "";

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    // update the logged-in user's password
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Password updated." });
      setPassword("");
    }
    setLoading(false);
  }

  return (
    <>
      <Header />
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit} className="form-widget">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={email} disabled />
        </div>
        <div>
          <label htmlFor="password">New Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button
            className="button block primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </div>
        {message && (
          <div
            style={{
              marginTop: "10px",
              color: message.type === "error" ? "red" : "green",
            }}
          >
            {message.text}
          </div>
        )}
      </form>
    </>
  );
}
