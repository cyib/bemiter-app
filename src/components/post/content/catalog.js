import * as React from 'react';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { Grid, Row, Col } from 'react-native-paper-grid';
import globalVars from '../../../helpers/globalVars';
import { processDatePost } from '../../../helpers/utils';

const ContentCatalog = (props) => {

  return (
    <View style={{ backgroundColor: globalVars.selectedColors.background, marginHorizontal: 10, borderRadius: 5 }}>
      <Row>
        <Col size={5}>
          <View style={{ padding: 5 }}>
            <Image source={{ uri: props.source }}
              onLoadEnd={() => {
                if (props.setLoading) props.setLoading(false)
              }}
              style={{ height: 150, borderRadius: 5 }} />
          </View>
        </Col>
        <Col size={6} >
          <Row style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 28, textAlign: 'center', justifyContent: 'center' }}>{props.title}</Text>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <Text style={{ fontSize: 12, textAlign: 'center', justifyContent: 'center' }}>{props.description}</Text>
          </Row>
          <Row style={{ justifyContent: 'center' }}>
            <TouchableOpacity style={{ 
              backgroundColor: globalVars.selectedColors.primary,
              borderRadius: 5,
              padding: 15}}>
              <Text style={{ color: globalVars.selectedColors.background}}>
              VER CATÁLOGO
              </Text>
              </TouchableOpacity>
          </Row>
        </Col>
      </Row>
    </View>
  );
}

export default ContentCatalog;