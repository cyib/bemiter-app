import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function ModalTester() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, zIndex: 9999 }}>
      <Button title="Show modal" onPress={toggleModal} />

      <Modal isVisible={isModalVisible} 
      style={{ maxHeight: 200, maxWidth: 300, top: '50%' }}
      swipeDirection={'left'} 
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onTouchStart={() => console.log('movendo')}
      onTouchMove={() => console.log('movendo')}
      onSwipeMove={(g) => console.log('swipe', g) }>
        <View style={{ flex: 1 }}>
          <Text>Hello!</Text>

          <Button title="Hide modal" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;