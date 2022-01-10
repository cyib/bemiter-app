import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  SafeAreaView
} from 'react-native';

const MainStatusBar = (props) => {
  //const STATUSBAR_HEIGHT = StatusBar.currentHeight;
  var STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;
  const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 60;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    statusBar: {
      height: STATUSBAR_HEIGHT,
      backgroundColor: props.backgroundColor ? props.backgroundColor : 'green',
    },
    appBar: {
      height: APPBAR_HEIGHT,
    },
    content: {
      flex: 1,
      backgroundColor: '#33373B',
    },
  });

  return (
    <View style={styles.statusBar}>
      <SafeAreaView>
        <StatusBar translucent style={styles.appBar} {...props} />
      </SafeAreaView>
    </View>
  );
};

export default MainStatusBar;