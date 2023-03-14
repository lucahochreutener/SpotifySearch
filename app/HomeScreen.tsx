import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { getAccessToken } from "../components/authSpotify/auth";
import { clientId } from "../components/authSpotify/script";
import Search from "../components/Search";
import SignIn from "../components/SignIn";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectTokens,
  setAccessToken,
  setCode,
  setState,
} from "../store/tokenSlice";

export default function HomeScreen({ navigation }: any) {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(selectTokens);
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const handleUrlWithToken = () => {
    if (Platform.OS !== "web") return;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    dispatch(setCode(urlParams.get("code") ?? ""));
    dispatch(setState(urlParams.get("state") ?? ""));

    getAccessToken(clientId, urlParams.get("code") ?? "", tokens.verifier)
      .then((accessToken) => {
        if (accessToken) {
          dispatch(setAccessToken(accessToken));
          setShowSnackBar(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  React.useEffect(() => {
    handleUrlWithToken();
  });

  return (
    <View style={styles.containerView}>
      <Text style={styles.title}>Home Screen</Text>
      <Snackbar
        style={{ backgroundColor: "#25E987" }}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}
      >
        Spotify Token erhalten
      </Snackbar>
      <SignIn />
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  space: {
    margin: 10,
  },
  title: {
    fontSize: 30,
  },
});
