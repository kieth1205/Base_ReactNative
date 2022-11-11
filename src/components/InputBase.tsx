/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableNativeFeedback,
  TextInputProps,
  Keyboard,
  InputAccessoryView,
  Button,
  Dimensions,
} from 'react-native';
import {HelperText} from 'react-native-paper';
import {theme} from '../constants/theme';

const SIZE = {
  medium: 'medium',
  large: 'large',
  small: 'small',
};

type Props = {
  label?: string;
  labelStyle?: object;
  labelContainerStyle?: object;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  placeholder?: string;
  helperText?: string;
  containerStyle?: object;
  inputContainerStyle?: object;
  inputStyle?: object;
  required?: boolean;
  disabled?: boolean;
  start?: JSX.Element;
  startContainerStyle?: object;
  end?: JSX.Element;
  endContainerStyle?: object;
  rows?: number;
  size?: string;
  onPress?: () => void;
  onPressDone?: () => void;
  errorStyle?: object;
  rest?: TextInputProps;
};

const ViewInput = ({
  value,
  onPress,
  placeholder,
}: {
  value: string | undefined;
  onPress: any;
  placeholder?: string;
}) => {
  const style = useMemo(
    () => [styles.textPlaceHolder, inputSize(SIZE.medium)],
    [],
  );
  return (
    <TouchableNativeFeedback onPress={onPress} style={styles.viewInput}>
      {!value ? (
        <Text style={style}>{placeholder}</Text>
      ) : (
        <Text style={[styles.textInput, inputSize(SIZE.medium)]}>{value}</Text>
      )}
    </TouchableNativeFeedback>
  );
};

export default function Input({
  label,
  labelStyle,
  labelContainerStyle,
  value,
  onChangeText,
  onSubmitEditing,
  onBlur,
  error,
  placeholder,
  helperText,
  containerStyle,
  inputContainerStyle,
  inputStyle,
  required,
  disabled,
  start,
  startContainerStyle,
  end,
  endContainerStyle,
  rows,
  onPressDone,
  size = SIZE.medium,
  onPress,
  errorStyle,
  ...rest
}: Props & TextInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <View style={[styles.labelContainer, labelContainerStyle]}>
          <Text style={[styles.label, labelStyle]}>{label}</Text>
          {required && <Text style={styles.required}>※</Text>}
        </View>
      )}

      <View
        style={[
          disabled
            ? disableInputStyle
            : error
            ? errorInputStyle
            : styles.inputContainer,
          inputContainerStyle,
        ]}>
        {start && (
          <View style={[styles.start, startContainerStyle]}>{start}</View>
        )}

        {onPress ? (
          <ViewInput {...{value, onPress, placeholder}} />
        ) : (
          <>
            <TextInput
              onSubmitEditing={onSubmitEditing}
              onChangeText={onChangeText}
              value={value}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor={'#AAAAAA'}
              returnKeyType="done"
              returnKeyLabel={'Done'}
              style={
                rows
                  ? [styles.areaInput, inputStyle]
                  : [styles.input, inputSize(size), inputStyle]
              }
              multiline={!!rows}
              numberOfLines={rows}
              selectionColor={theme.colors.primary}
              editable={!disabled}
              inputAccessoryViewID="Done"
              {...rest}
            />
            {Platform.OS === 'ios' && (
              <InputAccessoryView nativeID="Done">
                <View style={styles.accessory}>
                  <Button
                    onPress={
                      onPressDone ? onPressDone : () => Keyboard.dismiss()
                    }
                    title="完了"
                  />
                </View>
              </InputAccessoryView>
            )}
          </>
        )}

        {end && <View style={[styles.end, endContainerStyle]}>{end}</View>}
      </View>
      <HelperText
        type="error"
        visible={!!error}
        style={errorStyle ? [styles.errorText, errorStyle] : styles.errorText}>
        ※ {helperText}
      </HelperText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelContainer: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.inputLabel,
  },
  required: {
    color: theme.colors.require,
    fontSize: 16,
    marginLeft: 4,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F2FB',
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F0F2FB',
  },
  input: {
    flexGrow: 1,
    textAlignVertical: 'center',
    paddingHorizontal: 5,
    color: '#444',
    width: 1,
  },
  textInput: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    color: '#444',
    lineHeight: 40,
    fontSize: 16,
  },
  textPlaceHolder: {
    flexGrow: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
    color: '#A3A1A1',
    lineHeight: 40,
    fontSize: 16,
  },
  areaInput: {
    flexGrow: 1,
    textAlignVertical: 'top',
    height: Platform.OS === 'ios' ? 80 : undefined,
    fontSize: 18,
    color: '#000',
  },
  start: {
    marginHorizontal: 10,
  },
  end: {
    marginHorizontal: 10,
  },
  inputErrorStyles: {
    backgroundColor: '#FFEFEF',
    borderWidth: 2,
    borderColor: theme.colors.error,
  },
  inputDisableStyle: {
    backgroundColor: '#D1D1D1',
    borderColor: '#D1D1D1',
  },
  errorText: {
    color: theme.colors.error,
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 2,
    paddingHorizontal: 3,
    paddingTop: 2,
  },
  accessory: {
    width: Dimensions.get('window').width,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 8,
  },
  viewInput: {alignItems: 'center', borderWidth: 1},
});

const errorInputStyle = StyleSheet.compose(
  styles.inputContainer,
  styles.inputErrorStyles,
);

const disableInputStyle = StyleSheet.compose(
  styles.inputContainer,
  styles.inputDisableStyle,
);

const inputSize = (size: string) => {
  switch (size) {
    case SIZE.medium:
      return {
        height: 48,
        fontSize: 18,
      };
    case SIZE.large:
      return {
        height: 63,
        fontSize: 40,
      };
    default:
      return {
        height: 40,
        fontSize: 14,
      };
  }
};
