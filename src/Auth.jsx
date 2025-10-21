import { supabase } from "./supabaseClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
export default function Auth2() {
  return (
    <div className="row flex flex-center">
      <div className="col-6 form-widget">
        <h1 className="header">Public Bookmarks - Login</h1>
        <Auth
          supabaseClient={supabase}
          providers={[]}
          magicLink={true}
          appearance={{ theme: ThemeSupa }}
        />
      </div>
    </div>
  );
}
