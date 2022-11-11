import {createRef} from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const navigationRef = createRef(null);

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function push(...args) {
  navigationRef.current?.dispatch(StackActions.push(...args));
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}

export function setParams(params) {
  navigationRef.current?.dispatch(CommonActions.setParams(params));
}

export function getRoute() {
  return navigationRef.current?.getCurrentRoute();
}

export function reset(...args) {
  navigationRef.current?.reset(...args);
}
