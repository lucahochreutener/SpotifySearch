import { ResponseType, useAuthRequest } from "expo-auth-session";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, Text } from "react-native";
import { Snackbar } from "react-native-paper";
import config from "../config";
import { useAppDispatch } from "../store/hooks";
import { setAccessToken, setVerifier } from "../store/tokenSlice";
import { init } from "./authSpotify/script";

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const handleSpotifyConnectWeb = async () => {
    init().then((data) => {
      dispatch(setVerifier(data.verifier));
      router.push(data.authUrl);
    });
  };

  const discovery = {
    authorizationEndpoint: "https://accounts.spotify.com/authorize",
    tokenEndpoint: "https://accounts.spotify.com/api/token",
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      responseType: ResponseType.Token,
      clientId: config.SPOTIFY_CLIENT_ID,
      clientSecret: config.SPOTIFY_CLIENT_SECRET,
      scopes: [
        "user-read-currently-playing",
        "user-read-recently-played",
        "user-read-playback-state",
        "user-top-read",
        "user-modify-playback-state",
        "streaming",
        "user-read-email",
        "user-read-private",
      ],
      usePKCE: false,
      redirectUri: config.REDIRECT_URL_ANDROID ?? "",
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      dispatch(setAccessToken(access_token));
      setShowSnackBar(true);
    }
  }, [response]);
  return (
    <>
      <Snackbar
        style={{ backgroundColor: "#25E987" }}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        Spotify Token erhalten
      </Snackbar>
      {Platform.OS === "web" && (
        <Pressable
          style={[styles.space, styles.button]}
          onPress={() => handleSpotifyConnectWeb()}
        >
          <Text style={styles.text}>Connect Spotify Account web</Text>
        </Pressable>
      )}
      {Platform.OS !== "web" && (
        <Pressable
          style={[styles.space, styles.button]}
          onPress={() => promptAsync()}
        >
          <Text style={styles.text}>Connect Spotify Account Native</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  space: {
    margin: 10,
  },
});
