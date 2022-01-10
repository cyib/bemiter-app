import * as React from 'react';
import { useState } from 'react';
import { Image, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';

const CardSimple = (props) => {
  var source = props.src ? props.src : `https://picsum.photos/200/200?random=${getRandomInt(1, 100)}`;
  var [loading, setLoading] = useState(true);

  return (
    <View style={{
      backgroundColor: '#ffffff00',
      margin: 7
    }}>
      {loading ? <ActivityIndicator
        size="small" color={globalVars.selectedColors.primary}
        style={{ zIndex: 10, position: 'absolute', left: '35%', top: '35%' }} /> : null}
      <Image style={{
        height: 80, width: 80,
        borderRadius: 10, borderWidth: 2, borderColor: globalVars.selectedColors.secundary,
      }} source={{ uri: source }}
        onLoadEnd={() => setLoading(false)} />
    </View>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default CardSimple;