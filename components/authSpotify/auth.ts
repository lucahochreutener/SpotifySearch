import base64 from 'base-64';
import * as Crypto from 'expo-crypto';
import 'text-encoding-polyfill';
import config from '../../config';

export interface Redirect {
    verifier: string;
    authUrl: string;
}

export async function redirectToAuthCodeFlow(clientId: string): Promise<Redirect> {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", config.REDIRECT_URL_WEB);
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);
    const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
    return {verifier, authUrl};
}

export async function getAccessToken(clientId: string, code: string, verifier: string) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", config.REDIRECT_URL_WEB);
    params.append("code_verifier", verifier!);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

function generateCodeVerifier(length: number) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    
    const digest = await Crypto.digest(
        Crypto.CryptoDigestAlgorithm.SHA256,
        data
      );

    return base64.encode(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}
