import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Vibration, TouchableOpacity, Platform } from 'react-native';
import { Video } from 'expo-av';
import globalVars from '../../../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { muteAllVideos } from '../../../helpers/utils';
import { apiUrl } from '../../../helpers/environment';
import { useNavigation } from "@react-navigation/native";

const ContentVideo = (props) => {
  const navigation = useNavigation();
  var [postId, setPostId] = useState(props.postData.id ? props.postData.id : null);
  var [source, setSource] = useState(props.src ? props.src : null);
  var [withSourceHeight, setWithSourceHeight] = useState(props.withSourceHeight ? props.withSourceHeight : 500);
  var [withSourceBorderValue, setWithSourceBorderValue] = useState(props.withSourceBorderValue ? props.withSourceBorderValue : 0);
  var [withoutVolume, setWithoutVolume] = useState(props.withoutVolume ? props.withoutVolume : false);
  var [withoutPlay, setWithoutPlay] = useState(props.withoutPlay ? props.withoutPlay : false);
  var [withGoToPost, setWithGoToPost] = useState(props.withGoToPost ? props.withGoToPost : false);
  var [buttonColor, setButtonColor] = useState(props.buttonColor ? props.buttonColor : globalVars.selectedColors.secundary);
  var [iconColor, setIconColor] = useState(props.iconColor ? props.iconColor : globalVars.selectedColors.text);

  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  var videoRef = useRef(null);
  var [regVideoRefGlobal, setRegVideoRefGlobal] = useState(false);

  var [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
      if (withoutVolume) setIsMuted(true);
    }
    if (!withoutPlay) {
      // if (videoRef && !regVideoRefGlobal) {
      //   videoRef.setIsPlaying = setIsPlaying;
      //   videoRef.setIsMuted = setIsMuted;
      //   if (!global.videosRefs) global.videosRefs = [];
      //   global.videosRefs.push(videoRef);
      //   setRegVideoRefGlobal(true);
      // }
    }
  }, [retryCounter]);

  const [retryCounter, setRetryCounter] = useState(0);
  const [haveErrorYet, setHaveErrorYet] = useState(true);
  const retryAndChangeSource = () => {
    if (haveErrorYet) {
      setTimeout(() => {
        if (source.indexOf('https://ipfs.io/') == -1) {
          var path = source.split('//')[1].split('.')[0];
          var namefile = source.split('link/')[1];
          setSource(`https://ipfs.io/ipfs/${path}/${namefile}`)
        } else {
          setSource(props.src);
        }
      }, 10000);
    }
  }

  const pressPlay = () => {
    if(!withoutPlay && !withGoToPost){
      isPlaying ? setIsPlaying(false) : setIsPlaying(true)
    }
    if(withGoToPost){
      navigation.navigate('PostProfile', {
        postId
      });
    }
  }

  return (
    <View>
      <View onTouchMove={() => {setIsPlaying(false)}}>
        <TouchableOpacity
          activeOpacity={withGoToPost ? 0.5 : 1}
          delayLongPress={500}
          onLongPress={() => {
            videoRef.current.setPositionAsync(0);
          }}
          onPress={() => {
            pressPlay();
          }
          }>
          <Video
            key={`${props.src}-video-${retryCounter}`}
            ref={videoRef}
            style={{ height: withSourceHeight, zIndex: -1, borderRadius: withSourceBorderValue }}
            source={{
              uri: source,
              cache: 'only-if-cached',
            }}
            resizeMode="cover"
            onPlaybackStatusUpdate={status => {
              setStatus(() => status)
            }}
            useNativeControls={false}
            onReadyForDisplay={() => {
              props.setLoading(false);
              setHaveErrorYet(false);
            }}
            onError={() => {
              // setRetryCounter((v) => v + 1);
              // if (retryCounter <= 1) {
              //   retryAndChangeSource();
              // }
            }}
            isLooping={true}
            shouldPlay={isPlaying}
            isMuted={isMuted}
          />
        </TouchableOpacity>
        <View style={{ position: 'absolute' }}
          onTouchEnd={() => {
            pressPlay();
          }}>
          {
            status.isPlaying ?
              <View style={{
                backgroundColor: buttonColor,
                borderRadius: 4, padding: 2, margin: 3
              }}>
                <Text>
                  <MaterialCommunityIcons name="pause" color={iconColor} size={16} />
                </Text>
              </View>
              :
              <View style={{
                backgroundColor: buttonColor,
                borderRadius: 4, padding: 2, margin: 3
              }}>
                <Text>
                  <MaterialCommunityIcons name="play" color={iconColor} size={16} />
                </Text>
              </View>
          }
        </View>
        {!withoutVolume ?
          <TouchableOpacity style={{
            position: 'absolute', right: 0, bottom: 0,
            backgroundColor: buttonColor,
            borderRadius: 5, padding: 4, margin: 3
          }}
            onPress={() => {
              if (isMuted) {
                setIsMuted(false);
              } else {
                setIsMuted(true);
              }
            }}>
            {
              !isMuted ?
                <Text>
                  <MaterialCommunityIcons name="volume-source" color={globalVars.selectedColors.text} size={25} />
                </Text>
                :
                <Text>
                  <MaterialCommunityIcons name="volume-off" color={globalVars.selectedColors.text} size={25} />
                </Text>
            }
          </TouchableOpacity>
          : null}
      </View>
    </View>
  );
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ContentVideo;