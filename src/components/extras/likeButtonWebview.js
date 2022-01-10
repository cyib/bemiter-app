import React, { useState } from "react"
import { View, Image, Dimensions, TouchableOpacity } from "react-native"
import Slider from 'react-native-custom-slider';

const SliderApp = props => {

  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(false);

  const reactionThumb = () => {
    var rotate_ = '0deg';
    var source_ = require('../../assets/reactions/like.gif');
    var size_ = (Dimensions.get('screen').width / 10);

    if (value == 0) {
      rotate_ = '-90deg';
      source_ = require('../../assets/reactions/smile.gif');
      size_ = size_ + 20;
    }
    if (value == 1) {
      rotate_ = '-90deg';
      source_ = require('../../assets/reactions/like.gif');
      size_ = size_ + 20;
    }
    if (value == 2) {
      rotate_ = '-90deg';
      source_ = require('../../assets/reactions/angry.gif');
      size_ = size_ + 20;
    }

    return (<Image
      style={{
        width: size_,
        height: size_,
        transform: [{ rotate: rotate_ }]
      }}
      source={source_} />)
  }

  return (
    <View style={{ justifyContent: 'center', flexDirection: 'row', top: 5 }}
      onLayout={() => setVisible(true)}>
      {visible ?
        <>
          <View style={{ width: '85%', height: '0%' }} />
          <View style={{ width: '100%', height: '100%' }}
            onTouchStart={() => { props.setScrollEnabled(false); }}
            onTouchEnd={() => { props.setScrollEnabled(true); }}
          >
            <View style={{ left: -50, bottom: 35, zIndex: 9999 }}>
              <Slider
                value={value}
                minimumValue={0}
                maximumValue={2}
                step={1}
                vertical={true}
                style={{ height: 100, transform: [{ rotate: '90deg' }] }}
                onValueChange={(value) => setValue(value)}
                minimumTrackTintColor={'transparent'}
                maximumTrackTintColor={'transparent'}
                trackStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: 'transparent'
                }}
                customThumb={
                  <View
                    style={{
                    }}
                  >
                    <TouchableOpacity
                      delayPressIn={0}
                      onPressIn={() => {
                        props.setScrollEnabled(false);
                      }}
                      delayPressOut={0}
                      onPressOut={() => {
                        props.setScrollEnabled(true);
                      }}>
                      {reactionThumb()}
                    </TouchableOpacity>
                  </View>
                }
              />
            </View>
          </View>
        </>
        : null}
    </View>
  )
}

export default SliderApp;