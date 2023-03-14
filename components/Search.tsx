import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { fetchTracks } from "../components/authSpotify/script";
import { Track } from "../models/Track";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTokens } from "../store/tokenSlice";
import { selectTracks, setSearch, setTracks } from "../store/trackSlice";

export default function Search() {
  const [searchText, setSearchText] = React.useState("");
  const tokens = useAppSelector(selectTokens);
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks).tracks;
  const navigation = useNavigation();

  const handle = () => {
    fetchTracks(searchText, tokens.accessToken)
      .then((data: Track[]) => {
        dispatch(setSearch(searchText));
        dispatch(setTracks(data));
        navigation.navigate("Tracks" as never, {} as never);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View>
      <Text style={styles.caption}>Such Feld:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setSearchText}
        value={searchText}
      />
      <Pressable style={styles.button} onPress={() => handle()}>
        <Text style={styles.text}>Suche</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
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
  caption: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
