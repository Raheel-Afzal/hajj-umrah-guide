import {Picker} from '@react-native-picker/picker';
import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {COLORS} from '../constants';

interface Props {
  value: any;
  onChange: (itemValue: any, itemIndex: number) => void;
  items: string[];
}

export const DropDown: FC<Props> = ({value, onChange, items}) => {
  return (
    <View
      style={{
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 12,
        width: '100%',
      }}>
      <Picker
        mode="dropdown"
        dropdownIconColor={COLORS.primary}
        selectedValue={value}
        onValueChange={onChange}>
        {items.map((item, index) => (
          <Picker.Item key={index} label={item} value={item} />
        ))}
      </Picker>
    </View>
  );
};
