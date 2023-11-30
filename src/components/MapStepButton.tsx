import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';

interface StepButtonProps {
  top: any;
  right: any;
  text: string;
  onPress: () => void;
}
export const MapStepButton: FC<StepButtonProps> = ({
  onPress,
  top,
  right,
  text,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      ...styles.stepButton,
      top,
      right,
    }}>
    <Text style={styles.stepText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  stepButton: {
    transform: [{rotate: '90deg'}],
    backgroundColor: '#cd6345',
    borderRadius: 100,
    height: 30,
    width: 30,
    position: 'absolute',
  },
  stepText: {
    fontWeight: '900',
    color: COLORS.bgGrey,
    textAlign: 'center',
    fontSize: 20,
  },
});
