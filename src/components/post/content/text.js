import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalVars, { selectedColors } from '../../../helpers/globalVars';
import { useNavigation } from "@react-navigation/native";
import { diffTime } from '../../../helpers/utils';

const ContentText = (props) => {
  const navigation = useNavigation();
  var [postId, setPostId] = useState(props.postData ? props.postData.id : null);
  var [content, setContent] = useState(props.content ? props.content : '...');
  var withSourceHeight = props.withMaxLinesToText ? props.withMaxLinesToText : 10;
  var [withGoToPost, setWithGoToPost] = useState(props.withGoToPost ? props.withGoToPost : false)
  var [colors, setColors] = useState(props.colors ? props.colors : globalVars.selectedColors);

  const goToPost = () => {
    if (withGoToPost) {
      navigation.navigate('PostProfile', {
        postId
      });
    }
  }

  var [onFirstTap, setOnFirstTap] = useState(null);

  function doubleTap() {
    if(diffTime(onFirstTap, new Date()) < 300){
      props.doubleTap(true);
    }else{
      setOnFirstTap(new Date());
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={withGoToPost ? 0.5 : 1} onPress={() => {
        goToPost();
      }}>
      <View 
      // onTouchStart={() => { 
      //   if(props.doubleTap){
      //     doubleTap(); 
      //   }
      // }}
      style={{
        backgroundColor: globalVars.selectedColors.backopaque,
        paddingVertical: 15, paddingHorizontal: 10, margin: 5, borderRadius: 2, marginBottom: -25
      }}>
        <Text ellipsizeMode='tail' 
        numberOfLines={withSourceHeight} 
        style={{ fontSize: 16, color: colors.text }}>
          {content}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ContentText;