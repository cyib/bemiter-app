import React, { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Platform, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Col, Row } from "react-native-paper-grid";
import globalVars from "../../helpers/globalVars";

function ModalPromptBasic({
  button,
  buttonEnabled,
  buttonAction,
  swipeDirection,
  animationIn,
  animationOut,
  maxHeight,
  backgroundColor,
  children
}) {

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ zIndex: 9999 }}>
      <TouchableOpacity activeOpacity={buttonEnabled ? 0.5 : 1}
        onPress={() => {
          if (buttonEnabled) {
            toggleModal();
            if (buttonAction) buttonAction();
          }
        }}>
        {button}
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}
      backdropOpacity={1}
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        swipeDirection={swipeDirection ? swipeDirection : 'down'}
        animationIn={animationIn ? animationIn : 'fadeIn'}
        animationOut={animationOut ? animationOut : 'bounceOut'}>
        <View style={{
          flex: 1,
          top: Platform.OS == 'ios' ? -150 : 0,
          borderRadius: 3,
          backgroundColor: backgroundColor ? backgroundColor : globalVars.selectedColors.secundary,
          maxHeight: maxHeight ? maxHeight : '100%', maxWidth: '100%',
          paddingHorizontal: 5,
          justifyContent: 'center'
        }}>
          {children}
        </View>
      </Modal>
    </View>
  );
}

export default ModalPromptBasic;