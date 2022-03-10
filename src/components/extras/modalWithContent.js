import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { Col, Row } from "react-native-paper-grid";
import globalVars from "../../helpers/globalVars";

function ModalWithContent({
  button,
  buttonEnabled,
  buttonAction,
  swipeDirection,
  animationIn,
  animationOut,
  maxHeight,
  children
}) {

  const isFocused = useIsFocused();
    useEffect(() => {
    }, [isFocused]);

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
        onSwipeComplete={toggleModal}
        onBackdropPress={toggleModal}
        swipeDirection={swipeDirection ? swipeDirection : 'down'}
        animationIn={animationIn ? animationIn : 'slideInUp'}
        animationOut={animationOut ? animationOut : 'slideOutDown'}>
        <View style={{
          flex: 1,
          bottom: -175,
          borderRadius: 5,
          backgroundColor: globalVars.selectedColors.secundary,
          maxHeight: maxHeight ? maxHeight : '100%', maxWidth: '100%',
          paddingHorizontal: 5
        }}>
          <View style={{ height: 10, alignItems: 'center', marginVertical: 10 }}>
            <View style={{ 
              height: 5, width: 125, 
              backgroundColor: globalVars.selectedColors.disabled, 
              borderRadius: 100 }}/>
          </View>
          {isFocused ? children : null}
        </View>
      </Modal>
    </View>
  );
}

export default ModalWithContent;