import React from 'react';
import { Image, View } from 'react-native';
import { IMAGES } from '../constants';

type IconProps = {
  focused: boolean;
};

const CustomIcon = ({
  focused,
  iconSource,
}: {
  focused: boolean;
  iconSource: any;
}) => (
  <View
    style={{
      backgroundColor: '#fff',
      borderRadius: 50,
      top: -1,
      padding: focused ? 10 : 8,
    }}>
    <Image
      style={{
        height: focused ? 25 : 20,
        width: focused ? 25 : 20,
        tintColor: focused ? '#fbbf06' : '#249392',
      }}
      source={iconSource}
    />
  </View>
);

export const MakkahIcon = ({ focused }: IconProps) => (
  <View style={{ top: focused ? -20 : -15 }}>
    <Image
      resizeMode="contain"
      style={{ height: 80, width: 80 }}
      source={focused ? IMAGES.makkahSelected : IMAGES.makkahUnSelected}
    />
  </View>
);

export const CheckListIcon = ({ focused }: IconProps) => (
  <CustomIcon
    focused={focused}
    iconSource={IMAGES.checkList}
  />
);

export const MapIcon = ({ focused }: IconProps) => (
  <CustomIcon
    focused={focused}
    iconSource={IMAGES.map}
  />
);
