import React from 'react';
import {StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {Text} from 'react-native-paper';
type Props = {
  isVisible: boolean;
  onCloseModal?: () => void;
  title?: string;
  description?: string;
  titleStyle?: any;
  descriptionStyle?: any;
  modalProps?: any;
  children?: any;
};
const ModalBase: React.FC<Props> = ({
  isVisible,
  onCloseModal,
  title,
  description,
  children,
  titleStyle,
  descriptionStyle,
  ...modalProps
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      animationIn="fadeInDown"
      animationOut="fadeOutDown"
      backdropOpacity={0.8}
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={0}
      backdropTransitionOutTiming={0}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      {...modalProps}>
      <View style={styles.content}>
        <View
          style={children ? [styles.body, {paddingVertical: 0}] : styles.body}>
          {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
          {description && (
            <Text style={[styles.description, descriptionStyle]}>
              {description}
            </Text>
          )}
        </View>
        {children && children}
      </View>
    </Modal>
  );
};

export default ModalBase;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    justifyContent: 'center',
  },

  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },

  body: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  title: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },

  description: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});
