## Installation

```sh
cd SpotifySearch
```
```sh
npm install
```
## Start 


```sh
npm run start
```
## CSS
- This is the [CSS Framework](https://callstack.github.io/react-native-paper) which is used

## Setup Spotify
You need to do the following steps
- Go to the [Spotify Dashboard](https://developer.spotify.com/dashboard/applications)
- Create new App
- Go to the Settings
- Add your redirect URI Redirect URIs

## Config
The config is found in `config.ts` file.
- REDIRECT_URL_WEB &rarr; Must be in this format: "http://localhost:19000"
- REDIRECT_URL_ANDROID &rarr; Must be the IP of your PC and must be entered in the spotify dashboard: "exp://192.168.0.36:19000/"
- SPOTIFY_CLIENT_ID &rarr; Client ID from Spotify Dashboard
- SPOTIFY_CLIENT_SECRET &rarr; Secret ID from Spotify Dashboard
