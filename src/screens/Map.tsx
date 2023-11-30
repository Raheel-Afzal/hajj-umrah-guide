import React from 'react';
import {Image, View} from 'react-native';
import {MapStepButton} from '../components';
import {IMAGES, SCREENS} from '../constants';

export const Map = ({navigation}: any) => {
  const steps = [
    {top: '22.5%', right: '33%', text: '1'},
    {top: '31.5%', right: '27%', text: '2'},
    {top: '44%', right: '19%', text: '3'},
    {top: '53%', right: '20%', text: '4'},
    {top: '57.5%', right: '40%', text: '5'},
    {top: '36%', right: '55%', text: '6'},
    {top: '32%', right: '75%', text: '7'},
    {top: '50%', right: '70%', text: '8'},
    {top: '60%', right: '59%', text: '9'},
    {top: '68%', right: '50%', text: '10'},
  ];

  return (
    <View style={{backgroundColor: '#ffdc9d', flex: 1}}>
      <Image
        resizeMode="contain"
        style={{
          height: '100%',
          width: '100%',
        }}
        source={IMAGES.hajjGuide}
      />
      {steps.map((step, index) => (
        <MapStepButton
          onPress={() => navigation.navigate(SCREENS.MAPDETAIL)}
          key={index}
          {...step}
        />
      ))}
    </View>
  );
};
