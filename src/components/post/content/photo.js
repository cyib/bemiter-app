import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { apiUrl } from '../../../helpers/environment';

const ContentPhoto = (props) => {
  var [source, setSource] = useState(props.src ? `${apiUrl}/gateway?url=${props.src}` : null);

  return (
    <View style={{ maxHeight: 500, zIndex: -1 }}>
      <Image
          style={{ height: 500, zIndex: -1 }}
          onLoadEnd={() => {
            if(props.setLoading) props.setLoading(false)
          }}
          source={{ uri: source }} />
    </View>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ContentPhoto;