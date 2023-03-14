import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";
import { Track } from "../models/Track";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectTracks, setTrackId } from "../store/trackSlice";

export default function Tracks() {
  const tracks = useAppSelector(selectTracks).tracks;
  const search = useAppSelector(selectTracks).search;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  function handleOpen(track: Track) {
    dispatch(setTrackId(track.id));
    navigation.navigate("Track" as never, {} as never);
  }

  return (
    <>
      <Text style={styles.title}>Such Ergebnisse für: {search}</Text>
      <View style={styles.container}>
        {tracks.map((track) => (
          <List.Item
            key={track.id}
            title={track.name}
            description={track.artists[0].name}
            style={styles.item}
            onPress={() => handleOpen(track)}
            left={() => (
              <Image
                style={styles.image}
                source={
                  track?.album?.images?.length > 0
                    ? { uri: track.album.images[0].url }
                    : require("../assets/spotify.png")
                }
              />
            )}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
  item: {
    marginLeft: 20,
  },
  title: {
    fontSize: 25,
    marginTop: 1,
    marginLeft: 10,
  },
  container: {
    marginTop: 5,
    width: "90%",
    height: "80%",
  },
});
