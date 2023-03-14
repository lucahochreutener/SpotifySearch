import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "react-native/Libraries/Components/View/View";

type ItemProps = {
  title: string;
};

export default function TrackItem({ title }: ItemProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    height: 150,
    justifyContent: "center",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
