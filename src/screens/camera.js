import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import globalVars from '../helpers/globalVars';
import { Camera } from 'expo-camera';

const CameraScreen = () => {
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text> Acesso Negado! </Text>;
  }

  return (
    <View style={{
      flex: 1,
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: globalVars.selectedColors.background,
      alignContent: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <Camera
        style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
        type={type}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, left: 20 }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 24, marginBottom: 15, color: '#FFF' }}>TROCAR</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: 'absolute', bottom: 20, right: 20 }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 24, marginBottom: 15, color: '#FFF' }}>TROCAR</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default CameraScreen;