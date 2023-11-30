import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Hajj, Umrah} from '../Enums';
import {COLORS, IMAGES, SCREENS} from '../constants';
import {IconButton} from '../components';

export const TypeSelection = ({navigation}: any) => {
  const hajjItems = [Hajj.IFRAD, Hajj.QIRAN, Hajj.TAMATTU];
  const umrahItems = [Umrah.MUDARAF, Umrah.TAMMATU];
  return (
    <View style={styles.container}>
      <Image style={styles.coverImage} source={IMAGES.cover} />
      <View style={styles.box}>
        <Text style={styles.title}>Hajj/Umrah Guide</Text>
        <View style={{marginVertical: 20}}>
          {[...hajjItems, ...umrahItems].map((type, index) => (
            <View
              key={index}
              style={{flexDirection: 'row', marginVertical: 10}}>
              <View style={styles.hajjTextWrapper}>
                <Text style={styles.text}>{type}</Text>
              </View>
              <View style={{flexDirection: 'row', gap: 10}}>
                <IconButton
                  icon={IMAGES.personInIhram}
                  bg={COLORS.greenLight}
                  onPress={() =>
                    navigation.navigate(SCREENS.STEPS, {selectedType: type})
                  }
                />
                <IconButton
                  icon={IMAGES.map}
                  onPress={() =>
                    navigation.navigate(SCREENS.MAP, {selectedType: type})
                  }
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgGrey,
  },
  coverImage: {
    width: '100%',
    height: 350,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
  },
  box: {
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
    top: -170,
    height: 420,
    width: 320,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    alignSelf: 'center',
    elevation: 2,
    borderRadius: 20,
  },
  title: {
    backgroundColor: COLORS.primary,
    fontSize: 25,
    marginBottom: 10,
    textAlign: 'left',
    fontWeight: 'bold',
    color: COLORS.bgGrey,
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 12,
  },

  hajjTextWrapper: {
    paddingHorizontal: 20,
    width: '72%',
  },
  text: {
    marginVertical: 5,
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
