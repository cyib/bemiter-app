import * as React from 'react';
import { useState } from 'react';
import { Image } from 'react-native';
import { Avatar, Card, Title, ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';

const CardSimple = (props) => {
  var source = props.src ? props.src : `https://picsum.photos/400/400?random=${getRandomInt(1, 100)}`;
  var [loading, setLoading] = useState(true);

  return (
    <Card style={{
      backgroundColor: 'transparent',
      margin: 10,
    }}>
      {loading ? <ActivityIndicator
        size="small" color={globalVars.selectedColors.primary}
        style={{ zIndex: 10, position: 'absolute', left: '45%', top: '45%' }} /> : null}
      <Image style={{
        height: 200, width: 200, borderRadius: 5,
        borderWidth: 2,
        borderColor: globalVars.selectedColors.primary,
      }} source={{ uri: source }}
        onLoadEnd={() => setLoading(false)} />
    </Card>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default CardSimple;