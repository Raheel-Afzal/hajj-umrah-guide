import React, {FC} from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';

interface IconProps {
  icon: any;
  onPress?: () => void;
  bg?: string;
}
export const IconButton: FC<IconProps> = ({icon, onPress, bg}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.btn, {backgroundColor: bg || COLORS.bgGrey}]}>
      <Image style={styles.img} source={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 20,
    width: 20,
  },
  btn: {
    borderRadius: 12,
    top: -1,
    elevation: 2,
    padding: 8,
  },
});
