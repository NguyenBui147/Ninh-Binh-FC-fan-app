import * as React from 'react';
import { Modal, Portal, Text, PaperProvider } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Colors from '../../../../assets/colors/colors';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(false);

  setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.containerStyle}>
          <Text>Example Modal.  Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>

    </PaperProvider>
  );
};
const styles = StyleSheet.create({
    
    containerStyle: {
        backgroundColor: Colors.black,
        padding: 20
    },
    textStyle:{
        color:Colors.white
    }
});
export default MyComponent;