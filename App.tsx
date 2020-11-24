import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

// using redux for state handling
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducers from "./reducers";
const store = createStore(reducers);

import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";

const App = () => {
  // initializing screen as View is for satisfying TypeScript type checkings
  const [currentScreen, setCurrentScreen] = useState(<View></View>);

  const switchScreen = (screenName: string) => {
    switch (screenName) {
      case 'home':
        setCurrentScreen(<HomeScreen setCurrentScreen={switchScreen} />);
        break;
      case 'loading':
        setCurrentScreen(<LoadingScreen switchScreen={switchScreen} />);
        break;
      default:
        break;
    }
  }


  useEffect(() => {
    // when component loads first time, open loading screen
    switchScreen('loading');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        {currentScreen}
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default App;
