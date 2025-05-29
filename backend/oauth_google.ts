type GOOGLE_AUTH_KEYS =
  | "client_id"
  | "client_secret"
  | "endpoint"
  | "redirect_uri"
  | "access_type"
  | "prompt"
  | "scopes";
export const oauth_google: Record<GOOGLE_AUTH_KEYS, string> = {
  client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
  endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_REDIRECT || "",
  scopes:
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  access_type: "offline",
  prompt: "consent",
};
