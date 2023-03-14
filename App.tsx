import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import HomeScreen from "./app/HomeScreen";
import TrackScreen from "./app/TrackScreen";
import TracksScreen from "./app/TracksScreen";
import { persistor, store } from "./store/store";

const Stack = createNativeStackNavigator();

const config = {
  screens: {
    Home: "/",
    TracksScreen: "tracks",
    Track: "track",
  },
};

const linking = {
  prefixes: [
    "http://localhost:19000",
    "http://localhost:19000/tracks",
    "http://localhost:19000/track",
  ],
  config,
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={linking}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Tracks" component={TracksScreen} />
            <Stack.Screen name="Track" component={TrackScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
