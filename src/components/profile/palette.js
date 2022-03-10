import React, { useState } from "react";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Row, Col } from "react-native-paper-grid";
import { getData, removeData, setData } from "../../helpers/cache";
import { apiUrl } from "../../helpers/environment";
import themes, { list as listThemes } from "../../helpers/profileThemes";
import IconButton from "../extras/iconButton";

export default function PaletteModal(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [colors, setColors] = useState(props.colors ? props.colors : null);

  useEffect(() => {

  }, [])

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  async function changeTheme(themeName) {
    fetchTheme(themeName);
    var localUser = await getData('userInfo');
    localUser.theme = themeName;
    await setData('userInfo', localUser);
    props.setUpdateNowParentScreen(!props.updateNowParentScreen);
  }

  async function fetchTheme(themeName) {
    let userToken = await getData('token');
    let response = await fetch(`${apiUrl}/profile/changetheme/${themeName}`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`
      }
    });

    if (response.status == 200) {
      let responseJson = await response.json();
      ;
    }
  }

  return (
    <View style={{ flex: 1, zIndex: 9999 }}>
      <TouchableOpacity onPress={toggleModal} onLongPress={() => {
        ;
        removeData('userWidgets');
        }}>
        <IconButton icon={'palette'} color={colors.text} size={32} />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onBackdropPress={toggleModal}>
        <View style={{
          backgroundColor: colors.primary != 'transparent' ? colors.primary : 'gray',
          borderRadius: 5,
          height: 300
        }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginVertical: 10, color: colors.text }}>Temas</Text>
          </View>
          <FlatList
            key={(item) => item.id}
            data={listThemes}
            horizontal={false}
            refreshing={false}
            style={{ margin: 5, padding: 5, backgroundColor: colors.secundary, borderRadius: 5 }}
            renderItem={({ item }) => {
              return <ThemeItem name={item.name} />;
            }
            } />
        </View>
      </Modal>
    </View>
  );

  function ThemeItem({ name }) {
    return (<>
      <TouchableOpacity
        onPress={() => {
          ;
          setModalVisible(false);
          changeTheme(name);
        }}
        style={{
          backgroundColor: themes[name].secundary != 'transparent' ? themes[name].secundary : 'darkgray',
          margin: 1,
          padding: 12,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 5,
          minWidth: 300
        }}>
        <Row>
          <Col size={8}>
            <Text style={{ fontSize: 20, color: colors.text }}>{name}</Text>
          </Col>
          <Col size={1}>
            <View style={{
              backgroundColor: themes[name].primary,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: themes[name].text,
              height: 20, width: 20
            }} />
          </Col>
          <Col size={1}>
            <View style={{
              backgroundColor: themes[name].secundary,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: themes[name].text,
              height: 20, width: 20
            }} />
          </Col>
        </Row>
      </TouchableOpacity>
    </>)
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}