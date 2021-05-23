import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { NativeRouter, Route, Link, Redirect } from "react-router-native";
import Auth from "./components/Auth";

import { useFonts } from "expo-font";

import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./Redux/Store";
import Home from "./components/Home";

const Routes = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  return (
    <NativeRouter>
      {/* <SafeAreaView> */}
      {/* <StatusBar
  animated={true}
  barStyle="default"
  showHideTransition="slide"
/> */}

      <View style={styles.container}>
        <Route path="/">
          {!currentUser ? (
            <Route exact path="/">
              <Auth />
            </Route>
          ) : (
            <Home />
          )}
        </Route>
      </View>
      {/* </SafeAreaView> */}
    </NativeRouter>
  );
};

const App = () => {
  let [fontsLoaded] = useFonts({
    "Overpass-Black": require("./assets/fonts/Overpass-Black.ttf"),
    "Overpass-Light": require("./assets/fonts/Overpass-Light.ttf"),
    "Overpass-Regular": require("./assets/fonts/Overpass-Regular.ttf"),
  });

  return (
    fontsLoaded && (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 6,
    marginTop: 0,
  },
});

export default App;
