import { useRoute } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { MapStepButton } from '../components';
import { COLORS, IMAGES, SCREENS } from '../constants';
import { HajUmrahMap } from '../constants/HajUmrahMap';
import { HajjUmrah, Position } from '../models/Model';
import { getRightValue } from '../utils/getRightPosition';

export const Map = ({navigation}: any) => {
  //@ts-ignore
  let hajjUmrahType: HajjUmrah = useRoute().params.selectedType;
  const rightValue = getRightValue(hajjUmrahType);

  const stepsPostion: Position[] = [
    {top: '22%', right: '10%'},
    {top: '43%', right: '7%'},
    {top: '35%', right: '35%'},
    {top: '15%', right: '48%'},
    {top: '52%', right: '37%'},
    {top: '63%', right: '27%'},
    {top: '82%', right: '47%'},
    {top: '68%', right: '55%'},
    {top: '45%', right: '64%'},
    {top: '57%', right: '85%'},
    {top: '75%', right: '78%'},
  ];

  const picsPosition: Position[] = [
    {top: '10%', right: '10%'},
    {top: '30%', right: '7%'},
    {top: '20%', right: '28%'},
    {top: '10%', right: '54%'},
    {top: '40%', right: '40%'},
    {top: '60%', right: '30%'},
    {top: '70%', right: '52%'},
    {top: '58%', right: '56%'},
    {top: '40%', right: '68%'},
    {top: '54%', right: '77%'},
    {top: '73%', right: '72%'},
  ];

  return (
    <View style={{backgroundColor: '#FBF9D9', flex: 1}}>
      <Text style={[styles.nameText, {right: rightValue}]}>
        {hajjUmrahType}
      </Text>
      <Image
        resizeMode="contain"
        style={{
          height: '100%',
          width: '100%',
        }}
        source={IMAGES.mapBg}
      />
      {stepsPostion
        .slice(0, HajUmrahMap[hajjUmrahType].length)
        .map((stepPostion, index) => (
          <MapStepButton
            onPress={() => navigation.navigate(SCREENS.MAPDETAIL)}
            key={index}
            right={stepPostion.right}
            top={stepPostion.top}
            text={index + 1}
          />
        ))}

      {HajUmrahMap[hajjUmrahType].map((mapDetail, index) => (
        <Image
          key={index}
          resizeMode="contain"
          style={{
            height: '20%',
            width: '20%',
            position: 'absolute',
            top: picsPosition[index].top,
            right: picsPosition[index].right,
            transform: [{rotate: '90deg'}],
          }}
          source={mapDetail.image}
        />
      ))}
      <View style={styles.bulletPointWrapper}>
        <FlatList
          persistentScrollbar={true}
          style={{height: '100%'}}
          numColumns={2}
          data={HajUmrahMap[hajjUmrahType]}
          renderItem={({item, index}) => (
            <View key={index} style={{flexDirection: 'row', minWidth: '50%'}}>
              <View style={styles.bulletPoint}>
                <Text style={styles.bulletText}>{index + 1}</Text>
              </View>
              <Text style={styles.bulletItem}>{item.step}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nameText: {
    position: 'absolute',
    transform: [{rotate: '90deg'}],
    top: '70%',
    right: '-16%',
    fontWeight: 'bold',
    fontSize: 25,
    zIndex: 1,
  },


  bulletPointWrapper: {
    borderWidth:1,
    borderRadius:12,
    padding:5,
    width: '87%',
    flexWrap: 'wrap',
    height: '11%',
    position: 'absolute',
    top: '16%',
    left: '-30%',
    transform: [{rotate: '90deg'}],
    flexDirection: 'row',
  },
  bulletPoint: {
    backgroundColor: '#26313d',
    borderRadius: 100,
    height: 15,
    width: 15,
    zIndex: 1,
    marginVertical: 2,
    marginHorizontal: 5,
    marginTop: 1,
  },
  bulletText: {
    fontWeight: '900',
    color: COLORS.bgGrey,
    textAlign: 'center',
    fontSize: 10,
  },
  bulletItem: {
    fontWeight: 'bold',
    fontSize: 10,
    zIndex: 1,
    marginTop: 1,
    color: '#26313d',
  },
});
