import React, { useEffect, useState, useCallback } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, ScrollView, TouchableOpacity, View } from 'react-native';
import { Tab, Text, TabView } from 'react-native-elements';
import globalVars from '../../helpers/globalVars';
import ComponentEmitFeedGlobal from './global';
import ComponentEmitFeedLocal from './local';
import Post from '../post/post';
import postTemplates from '../../helpers/postTemplates';
import { Col, Row } from 'react-native-paper-grid';

export default () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
  }, [index]);

  return (
    <>
      <Row style={{ marginHorizontal: -3 }}>
        <TabItem
          title={{ label: 'EXPLORAR', size: 12, color: globalVars.selectedColors.text }}
          icon={{ name: 'earth', size: 25, color: globalVars.selectedColors.text }}
          tab={{
            color: globalVars.selectedColors.background,
            activatedColor: globalVars.selectedColors.backopaque,
            activatedBarColor: globalVars.selectedColors.primary,
            activatedBarHeight: 3,
            height: 56
          }}
          keyId={0}
        />
        <TabItem
          title={{ label: 'CONEXÕES', size: 12, color: globalVars.selectedColors.text }}
          icon={{ name: 'tooltip-account', size: 25, color: globalVars.selectedColors.text }}
          tab={{
            color: globalVars.selectedColors.background,
            activatedColor: globalVars.selectedColors.backopaque,
            activatedBarColor: globalVars.selectedColors.primary,
            activatedBarHeight: 3,
            height: 56
          }}
          keyId={1}
        />
      </Row>
      <Row style={{ maxHeight: Dimensions.get('screen').height - 125 }}>
        {
          index == 0 ?
            <>
              <ComponentEmitFeedGlobal urlRoute={'/feed/emits'} />
            </>
            : null
        }
        {
          index == 1 ?
            <>
              <ComponentEmitFeedGlobal urlRoute={'/feed/emits/connections'} />
            </>
            : null
        }
      </Row>
    </>
  );

  function TabItem({ title, icon, tab, keyId }) {
    let active = false;
    if (keyId == index) active = true;
    return (
      <Col style={{ marginBottom: -6, marginTop: -3, padding: 0 }}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => setIndex(keyId)}>
          <View style={{
            backgroundColor: !active ? tab.color : tab.activatedColor,
            height: tab.height,
            justifyContent: 'center', alignItems: 'center'
          }}>
            <Text style={{ fontSize: title.size, color: title.color, marginBottom: 3 }}>
              <MaterialCommunityIcons name={icon.name} color={icon.color} size={icon.size} />
            </Text>
            <Text style={{ fontSize: title.size, color: title.color }}>{title.label}</Text>
          </View>
          <View style={{
            backgroundColor: !active ? tab.color : tab.activatedBarColor,
            height: tab.activatedBarHeight
          }} />
        </TouchableOpacity>
      </Col>
    )
  }
};