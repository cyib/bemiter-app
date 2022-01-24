import * as React from 'react';
import { useState } from 'react';
import { Image, TouchableOpacity, View, Text, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import globalVars from '../../helpers/globalVars';
import Modal from "react-native-modal";
import Post from "../post/default";

const CardSimple = (props) => {
  var [randomNum, setRandomNum] = useState(getRandomInt(1, 1000));
  var [source, setSource] = useState(props.src ? props.src : `https://picsum.photos/1280/900?random=${randomNum}`);
  var [loading, setLoading] = useState(true);
  var [visibleModal, setVisibleModal] = useState(false);

  return (
    <>
      <ModalContent isVisible={visibleModal} source={source} setVisibleModal={setVisibleModal} />
      <View style={{
        backgroundColor: '#ffffff00',
        margin: 7
      }}>
        {loading ? <ActivityIndicator
          size="small" color={globalVars.selectedColors.primary}
          style={{ zIndex: 10, position: 'absolute', left: '35%', top: '35%' }} /> : null}
        <TouchableOpacity onPress={() => {
          setVisibleModal(true);
        }}>
          <Image style={{
            height: 80, width: 80,
            borderRadius: 10, borderWidth: 2, borderColor: globalVars.selectedColors.secundary,
          }} source={{ uri: source }}
            onLoadEnd={() => setLoading(false)} />
        </TouchableOpacity>
      </View>
    </>
  );
}

function ModalContent({ isVisible, source, setVisibleModal }) {
  var [startTouch, setStartTouch] = useState(0);
  var [endTouch, setEndTouch] = useState(0);

  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={{
          position: 'absolute',
          top: -20,
          left: -20,
          height: Dimensions.get('screen').height,
          width: Dimensions.get('screen').width
        }}
          onTouchStart={e => global.startTouch = e.nativeEvent.pageY}
          onTouchEndCapture={e => {
            global.endTouch = e.nativeEvent.pageY;
            let startTouch = global.startTouch;
            let endTouch = global.endTouch;
            console.log(startTouch, endTouch);
            if (startTouch < endTouch) {
              console.log('down');
              setVisibleModal(false);
            }
          }}>
          <View style={{ margin: 5, marginTop: 150 }}>
            <Post onlyContent={true} src={source} />
          </View>
        </View>
      </Modal>
    </View>
  );
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default CardSimple;