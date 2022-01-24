import * as React from 'react';
import { Modal, Portal, Text, Button, Provider } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
      <Button style={{margin: 30, backgroundColor: 'red', height: 100}} onPress={showModal}>
        Show
      </Button>
    </Provider>
  );
};

export default MyComponent;
