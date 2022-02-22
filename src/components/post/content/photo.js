import * as React from 'react';
import { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { apiUrl } from '../../../helpers/environment';
import { useNavigation } from "@react-navigation/native";
import { diffTime } from '../../../helpers/utils';

const ContentPhoto = (props) => {
  const navigation = useNavigation();
  var [postId, setPostId] = useState(props.postData ? props.postData.id : null);
  var [source, setSource] = useState(props.src ? `${apiUrl}/gateway?url=${props.src}` : null);
  var withSourceHeight = props.withSourceHeight ? props.withSourceHeight : 500;
  var withSourceBorderValue = props.withSourceBorderValue ? props.withSourceBorderValue : 0;
  var [withGoToPost, setWithGoToPost] = useState(props.withGoToPost ? props.withGoToPost : false);

  const goToPost = () => {
    if (withGoToPost) {
      navigation.navigate('PostProfile', {
        postId
      });
    }
  }

  var [onFirstTap, setOnFirstTap] = useState(null);

  function doubleTap() {
    if (diffTime(onFirstTap, new Date()) < 300) {
      props.doubleTap(true);
    } else {
      setOnFirstTap(new Date());
    }
  }

  return (
    <View onTouchStart={() => {
      if (props.doubleTap) {
        doubleTap();
      }
    }}>
      <TouchableOpacity activeOpacity={withGoToPost ? 0.5 : 1} style={{ maxHeight: 500, zIndex: -1 }} onPress={() => {
        goToPost();
      }}>
        <Image
          style={{ height: withSourceHeight, zIndex: -1, borderRadius: withSourceBorderValue }}
          onLoadEnd={() => {
            if (props.setLoading) props.setLoading(false)
          }}
          source={{ uri: source }} />
      </TouchableOpacity>
    </View>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ContentPhoto;