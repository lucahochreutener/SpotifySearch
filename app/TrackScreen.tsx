import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAppSelector } from "../store/hooks";
import { selectTracks } from "../store/trackSlice";

export default function TrackScreen({ navigation }: any) {
  const tracks = useAppSelector(selectTracks).tracks;
  const trackId = useAppSelector(selectTracks).trackId;
  const [track, setTrack] = React.useState<any>(null);

  React.useEffect(() => {
    if (trackId) {
      setTrack(tracks.find((track) => track.id === trackId));
    }
  }, [trackId]);

  return (
    <View style={{}}>
      <View style={styles.modalView}>
        <Image
          style={styles.albumImage}
          source={
            track?.album?.images?.length > 0
              ? { uri: track.album.images[0].url }
              : require("../assets/spotify.png")
          }
        />
        <Text>Name: {track?.name}</Text>
        <Text>Album Name: {track?.album?.name}</Text>
        <Text>Disk number: {track?.disc_number}</Text>
        <Text>
          Artist: {track?.artists?.length > 0 ? track?.artists[0].name : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  albumImage: {
    width: 300,
    height: 300,
  },
});
