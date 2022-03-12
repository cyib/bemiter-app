import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Col, Row } from 'react-native-paper-grid';
import globalVars from '../helpers/globalVars';
import IconButton from '../components/extras/iconButton';
import { useNavigation } from '@react-navigation/native';
import SendFile from './sendfile';

const Item = ({ icon, onPress, color }) => {
  color = color ? color : globalVars.selectedColors.text;
  return (<>
    <View style={{ padding: 2 }}>
      <TouchableOpacity style={{
        height: 125, width: '100%', padding: 15,
        borderRadius: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: globalVars.selectedColors.placeholder
      }} onPress={onPress}>
        <IconButton icon={icon} size={72} color={color} />
      </TouchableOpacity>
    </View>
  </>);
}

const CreateScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingTop: StatusBar.currentHeight || 0,
      backgroundColor: globalVars.selectedColors.background,
      alignContent: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <Row>
        <Col>
          <SendFile />
        </Col>
      </Row>
    </SafeAreaView>
  );
}

export default CreateScreen;