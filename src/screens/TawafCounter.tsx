import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, IMAGES} from '../constants';

export const TawafCounter = () => {
  const [count, setCount] = useState(0);
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="contain"
        source={IMAGES.greenIslamic}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Tawaf Counter</Text>
        </View>
        <Image
          style={styles.KabahPic}
          resizeMode="contain"
          source={IMAGES.perform_tawaf}
        />
        <View style={styles.rounded}>
          <Text style={styles.counterText}>{count}x</Text>
        </View>
        <TouchableOpacity
          disabled={count === 7}
          style={styles.counterButton}
          onPress={() => setCount(prev => prev + 1)}>
          <Text style={styles.counterBtnText}>
            {count === 7 ? 'Tawaf Completed' : ` Round ${count + 1}  Complete`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={count === 0}
          style={styles.counterButton}
          onPress={() => setCount(0)}>
          <Text style={styles.counterBtnText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#003231',
    flex: 1,
  },
  counterText: {
    color: 'white',
    fontSize: 40,
    fontWeight: '600',
    paddingTop: 5,
    textAlign: 'center',
  },
  counterBtnText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  counterButton: {
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderColor: 'white',
    borderWidth: 2,
    marginTop: 30,
    borderRadius: 50,
    backgroundColor: COLORS.greenLight,
  },
  rounded: {
    position: 'absolute',
    top: '25%',
    left: '28%',
    height: 70,
    width: 70,
    backgroundColor: COLORS.greenLight,
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2,
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
  header: {
    position: 'absolute',
    top: '15%',
    left: '30%',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  KabahPic: {
    alignSelf: 'center',
    height: '30%',
  },
});
