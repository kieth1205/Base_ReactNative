import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Icon } from '@react-native-material/core'

const RegisterScreen = () => {
  return (
    <View style={styles.root}>
      <Image
        style={styles.img_background}
        resizeMode="cover"
        source={require('../../assets/images/dental_clinic.jpeg')}
      />
      <View style={styles.bottom_view}>
        <Text style={styles.logo_txt}>Medical Clinic</Text>
        <Text style={styles.sign_txt} children={'Sign In'} />
        <View style={styles.auth_block}>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  img_background: {
    flex: 4,
    width: '100%',
  },
  bottom_view: {
    flex: 6,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    top: -20,
    paddingHorizontal: 20,
  },
  logo_txt: {
    top: -40,
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  sign_txt: {
    marginLeft: 10,
    color: 'black',
    fontSize: 20,
    fontWeight: '600',
  },
  auth_block: {
    marginTop: '5%',
    alignItems: 'flex-start',
    backgroundColor: 'red',
  },
});
