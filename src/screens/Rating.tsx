import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { AverageRating } from '../components/Rating/AveragaRating';
import { COLORS, IMAGES } from '../constants';
import { useRatingSql } from '../hooks/useRatingSql';

export const Rating = () => {
  const {getAllRating, addRating} = useRatingSql();

  const [userRating, setUserRating] = useState(0);
  const [ratingKey, setRatingKey] = useState(0);

  const handleSaveRating = () => {
    addRating({rating: userRating});
    setRatingKey(prevKey => prevKey + 1);
    setUserRating(0);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="contain"
        source={IMAGES.greenIslamic}
      />
      <View style={styles.contentContainer}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Rating</Text>
      </View>
      <View style={styles.saveRating}>
        <AirbnbRating
          size={35}
          key={ratingKey}
          count={5}
          onFinishRating={rating => {
            setUserRating(rating);
          }}
          starContainerStyle={{gap: 10}}
          defaultRating={0}
        />
        <TouchableOpacity
          disabled={userRating === 0}
          style={{
            ...styles.saveRatingBtn,
            ...{backgroundColor: userRating ? COLORS.greenLight : 'grey'},
          }}
          onPress={handleSaveRating}>
          <Text style={{color: 'white', fontSize: 20}}>Save Rating</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.averageRatingContainer}>
        <AverageRating totalRating={getAllRating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003231',
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '47.5%',
    position: 'absolute',
  },
  contentContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtn: {
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    marginHorizontal: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  header: {
    position: 'absolute',
    top: '10%',
    left: '32%',
    zIndex: 1,
  },
  saveRating: {
    position: 'absolute',
    top: '15%',
    left: '15%',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  saveRatingBtn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginVertical: 20,
    alignSelf: 'center',
  },
  averageRatingContainer: {
    position: 'absolute',
    top: '40%',
    left: '5%',
    flex: 1,
    zIndex: 1,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    width: '90%',
    height: '40%',
  },
  checkListText: {
    borderBottomColor: '#747474',
    borderBottomWidth: 2,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});
