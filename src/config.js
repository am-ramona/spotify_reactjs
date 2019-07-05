export const authEndpoint = "https://accounts.spotify.com/authorize";

// Replace with your app's client ID, redirect URI and desired scopes and state
export const clientId = "f6f08ea476ce449c939e0712b29661f1";
export const redirectUri = "http://localhost:3000/artistSearch?spotify=true";
export const scopes = [
    "user-read-private",
    "user-read-email"
];
export const state = '123';
