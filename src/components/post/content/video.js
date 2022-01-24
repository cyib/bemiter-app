import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { View, Text, Vibration, TouchableOpacity, Platform } from 'react-native';
import { Video } from 'expo-av';
import globalVars from '../../../helpers/globalVars';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { muteAllVideos } from '../../../helpers/utils';

const ContentVideo = (props) => {
  var [source, setSource] = useState(props.src ? props.src : null);

  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  var videoRef = useRef(null);
  var [regVideoRefGlobal, setRegVideoRefGlobal] = useState(false);

  var [isInit, setIsInit] = useState(true);
  useEffect(() => {
    if (isInit) {
      setIsInit(false);
    }
    if (videoRef && !regVideoRefGlobal) {
      videoRef.setIsPlaying = setIsPlaying;
      videoRef.setIsMuted = setIsMuted;
      if (!global.videosRefs) global.videosRefs = [];
      global.videosRefs.push(videoRef);
      setRegVideoRefGlobal(true);
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

  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={1}
          delayLongPress={500}
          onLongPress={() => {
            videoRef.current.setPositionAsync(0);
          }}
          onPress={() => {
            isPlaying ? setIsPlaying(false) : setIsPlaying(true)
          }
          }>
          <Video
            key={`${props.src}-video-${retryCounter}`}
            ref={videoRef}
            style={{ height: 500, zIndex: -1 }}
            source={{ 
              uri: source, 
              cache: 'only-if-cached' 
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
              setRetryCounter((v) => v + 1);
              if (retryCounter <= 1) {
                retryAndChangeSource();
              }
            }}
            isLooping={true}
            shouldPlay={isPlaying}
            isMuted={isMuted}
          />
        </TouchableOpacity>
        <View style={{ position: 'absolute' }}>
          {
            status.isPlaying ?
              <Text>
                <MaterialCommunityIcons name="pause" color={globalVars.selectedColors.background} size={15} />
              </Text>
              :
              <Text>
                <MaterialCommunityIcons name="play" color={globalVars.selectedColors.background} size={15} />
              </Text>
          }
        </View>
        <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: 0, height: 35, width: 35 }}
          onPress={() => {
            if (isMuted) {
              setIsMuted(false);
              muteAllVideos(false);
            } else {
              setIsMuted(true);
              muteAllVideos(true);
            }
          }}>
          {
            !isMuted ?
              <Text>
                <MaterialCommunityIcons name="volume-source" color={globalVars.selectedColors.background} size={30} />
              </Text>
              :
              <Text>
                <MaterialCommunityIcons name="volume-off" color={globalVars.selectedColors.background} size={30} />
              </Text>
          }
        </TouchableOpacity>
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