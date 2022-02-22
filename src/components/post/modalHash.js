import React, { useState } from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Col, Row } from "react-native-paper-grid";
import globalVars from "../../helpers/globalVars";

function ModalHash({ button, hashtags }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, zIndex: 9999 }}>
      <TouchableOpacity onPress={toggleModal}>
        {button}
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        swipeDirection={'left'}
        animationIn={'slideInLeft'}
        animationOut={'slideOutLeft'}>
        <View style={{
          flex: 1,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          backgroundColor: globalVars.selectedColors.secundary,
          maxHeight: 200, maxWidth: 320, left: -20
        }}>
          <Row>
            <Col size={19}>
              <Text style={{ fontSize: 16, marginBottom: 5 }}>Hashtags:</Text>
              <View style={{
                backgroundColor: globalVars.selectedColors.background,
                width: '100%', height: '85%', borderRadius: 5
              }}>
                <ModalContent/>
              </View>
            </Col>
            <Col size={1}>
              <View style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'flex-end',
              height: '100%',
            }}>
              <View style={{
                backgroundColor: globalVars.selectedColors.backopaque,
                width: 5, height: 50, borderRadius: 5, marginHorizontal: 2
              }}></View>
              </View>
            </Col>
          </Row>
        </View>
      </Modal>
    </View>
  );

  function ModalContent() {
    return (<View>
      
    </View>)
  }

  function HashItem() {
    
  }
}

export default ModalHash;