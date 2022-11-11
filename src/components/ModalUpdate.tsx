/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {theme} from '../constants/theme';
import ModalBase from './ModalBase';

type ModalProps = {
  isVisible: boolean;
  onCancel?: () => void;
  onConfirm?: () => void;
  onCloseModal?: () => void;
  title?: string;
  description?: string;
  textCancel?: string;
  textConfirm?: string;
};

const ModalUpdate: React.VFC<ModalProps> = ({
  isVisible,
  onCancel,
  onConfirm,
  onCloseModal,
  title,
  description,
  textCancel,
  textConfirm,
}) => {
  return (
    <ModalBase onCloseModal={onCloseModal} {...{isVisible}}>
      <View style={[styles.content, {paddingBottom: !description ? 20 : 0}]}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {description && (
        <View style={styles.wrapDescription}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}

      <View style={styles.action}>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.textButton}>{textCancel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onConfirm}>
          <Text style={styles.textButton}>{textConfirm}</Text>
        </TouchableOpacity>
      </View>
    </ModalBase>
  );
};

export default ModalUpdate;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: '600',
  },
  wrapDescription: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Roboto',
    color: '#000',
  },
  action: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    width: '50%',
  },
  textButton: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 2,
    paddingHorizontal: 3,
    paddingTop: 2,
  },
});
