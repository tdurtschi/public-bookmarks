import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import About from "./About";
import Browse from "./Browse";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import MyBookmarks from "./MyBookmarks";
import { DependencyInjectionProvider } from "./DependencyInjectionContext";
import getApiClient from "./apiClient";
import ResetPassword from "./ResetPassword";

function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <BrowserRouter>
      <DependencyInjectionProvider
        services={{ apiClient: getApiClient(session) }}
      >
        <div className="container" style={{ padding: "50px 0 100px 0" }}>
          <Routes>
            <Route path="/about" element={<About />} />
            {!session ? (
              <>
                <Route path="/login" element={<Auth />} />
                <Route path="*" element={<Browse session={session} />} />
              </>
            ) : (
              <>
                <Route path="/browse" element={<Browse session={session} />} />
                <Route
                  path="/account"
                  element={<Account session={session} />}
                />
                <Route
                  path="/resetPassword"
                  element={<ResetPassword session={session} />}
                />
                <Route path="/mybookmarks" element={<MyBookmarks />} />
                <Route path="*" element={<Navigate to="/browse" replace />} />
              </>
            )}
          </Routes>
        </div>
      </DependencyInjectionProvider>
    </BrowserRouter>
  );
}
export default App;
