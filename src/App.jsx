import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import Browse from "./Browse";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import MyBookmarks from "./MyBookmarks";
import { DependencyInjectionProvider } from "./DependencyInjectionContext";
import getApiClient from "./apiClient";

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
    <HashRouter>
      <DependencyInjectionProvider
        services={{ apiClient: getApiClient(session) }}
      >
        <div className="container" style={{ padding: "50px 0 100px 0" }}>
          <Routes>
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
                <Route path="/mybookmarks" element={<MyBookmarks />} />
                <Route path="*" element={<Navigate to="/browse" replace />} />
              </>
            )}
          </Routes>
        </div>
      </DependencyInjectionProvider>
    </HashRouter>
  );
}
export default App;
