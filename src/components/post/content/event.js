import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image } from 'react-native';
import globalVars from '../../../helpers/globalVars';
import { processDatePost } from '../../../helpers/utils';

const ContentEvent = (props) => {
  var day = processDatePost(props.start).day;
  var monthLabel = processDatePost(props.start).monthLabel;
  
  return (
    <View>
      <View>
        <View style={{ position: 'absolute', left: -2, top: 5, zIndex: 9999, padding: 10 }}>
          <View style={{
            borderRadius: 1,
            backgroundColor: globalVars.selectedColors.surface,
            padding: 5, paddingHorizontal: 10
          }}>
            <Text style={{ fontSize: 18 }}>{props.title}</Text>
          </View>
        </View>
        <View style={{ position: 'absolute', right: 25, top: 0, zIndex: 9999 }}>
          <View style={{
            borderRadius: 2,
            backgroundColor: globalVars.selectedColors.background,
            padding: 5, paddingHorizontal: 15
          }}>
            <Text style={{ fontSize: 30 }}>{day}</Text>
            <Text style={{ fontSize: 10, textAlign: 'center', marginTop: -5 }}>{monthLabel}</Text>
          </View>
          <View style={{
            backgroundColor: globalVars.selectedColors.primary,
            height: 5
          }}/>
        </View>
        <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
          <Image source={{ uri: props.source }} 
          onLoadEnd={() => {
            if(props.setLoading) props.setLoading(false)
          }}
          style={{ height: 200, width: '100%', borderRadius: 5 }} />
        </View>
        <View style={{ position: 'absolute', left: -2, bottom: 5, zIndex: 9999, padding: 10 }}>
          <View style={{
            borderRadius: 1,
            backgroundColor: globalVars.selectedColors.background,
            padding: 5, paddingHorizontal: 10
          }}>
            <Text style={{ fontSize: 14 }}>{props.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ContentEvent;