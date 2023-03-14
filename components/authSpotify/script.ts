// Because this is a literal single page application
// we detect a callback from Spotify by checking for the hash fragment
import config from "../../config";
import { Track } from "../../models/Track";
import { Redirect, redirectToAuthCodeFlow } from "./auth";

const clientId = config.SPOTIFY_CLIENT_ID;
export { clientId };

export async function init(): Promise<Redirect>{
    return await redirectToAuthCodeFlow(clientId);
}

export async function fetchTracks(search: string, accessToken: string) : Promise<Track[]> {
    const params = new URLSearchParams();
    params.append("q", search);
    params.append("type", "track");
    
    const result = await fetch( `https://api.spotify.com/v1/search?${params.toString()}`, {
        method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
    });

    const tracks = await result.json();
    return JSON.parse(JSON.stringify(tracks.tracks.items));
}
