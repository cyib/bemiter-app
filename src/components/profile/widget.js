import React, { useState } from "react";
import { useEffect } from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Col, Row } from "react-native-paper-grid";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { getData, removeData, setData } from "../../helpers/cache";
import { apiUrl } from "../../helpers/environment";
import globalVars from "../../helpers/globalVars";
import profileThemes from "../../helpers/profileThemes";
import widgetShape, { widgetList } from "../extras/widgetShapes";
import IconButton from "../extras/iconButton";
import uuid from 'react-native-uuid';

export default function WidgetModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  var [colors, setColors] = useState(profileThemes[props.userInfo.theme ? props.userInfo.theme : 'default']);

  useEffect(() => {

  }, [])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={{ flex: 1, borderRadius: 5, margin: 5 }}>
      <TouchableOpacity onPress={toggleModal}>
          <IconButton icon={'view-grid-plus'} color={colors.secundary} size={56} />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onBackdropPress={toggleModal}>
        <View style={{
          backgroundColor: colors.primary,
          borderRadius: 5,
          height: 400
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginVertical: 10 }}>Adicionar Widget</Text>
          </View>
          <FlatList
            key={(item) => item.id}
            data={widgetList}
            horizontal={false}
            refreshing={false}
            style={{ margin: 5, padding: 5, backgroundColor: globalVars.selectedColors.placeholder, borderRadius: 5 }}
            renderItem={({ item }) => {
              return <WidgetItem label={item.label} widgetFunctionName={item.functionName} />;
            }
            } />
        </View>
      </Modal>
    </View>
  );

  function WidgetItem({ label, widgetFunctionName }) {
    return (<>
      <TouchableOpacity
        onPress={() => {
          selectWidget(widgetFunctionName);
        }}
        style={{
          backgroundColor: colors.secundary,
          margin: 1,
          marginBottom: 10,
          padding: 5,
          borderWidth: 1,
          borderColor: colors.primary,
          borderRadius: 5,
          minWidth: 300
        }}>
        <Row>
          <Col>
            <Text style={{ fontSize: 14 }}>{label}:</Text>
          </Col>
        </Row>
        <Row>
          {widgetShape[widgetFunctionName](colors)}
        </Row>
      </TouchableOpacity>
    </>)
  }

  async function selectWidget(widgetFunctionName) {
    setModalVisible(false);
    var widget = {
      id: uuid.v4(),
      cacheId: uuid.v4(),
      functionName: widgetFunctionName,
      title: '',
      order: 0,
      showTo: 'follower',
    };
    var userWidgets = await getData('userWidgets');
    if(!userWidgets) {
      await setData('userWidgets', []);
      userWidgets = await getData('userWidgets');
    }
    userWidgets.push(widget);
    await setData('userWidgets', userWidgets);
    props.setReload(!props.reload);
  }

  async function saveWidget(body) {
    let userToken = await getData('token');
    let res = await fetch(`${apiUrl}/widget/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      },
      body: JSON.stringify(body),
    });

    let responseJson = await res.json();
    if (res.status == 200) {

    }
  }
}