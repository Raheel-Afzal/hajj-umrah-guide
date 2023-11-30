import React, {FC} from 'react';
import {COLORS} from '../constants';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
}
export const Button: FC<Props> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    width: 200,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
