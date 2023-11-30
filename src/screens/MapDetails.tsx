import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Hajj} from '../Enums';
import {COLORS, IMAGES} from '../constants';

export const MapDetails = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="contain"
        source={IMAGES.greenIslamic}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ihram</Text>
        </View>

        <View style={styles.listContainer}>
          <Text>
            The most necessary step is to enter into the state of Ihram. Ihram
            is related to the states of purity which is compulsory while
            crossing the boundaries of Mecca called Miqat. Muslim pilgrims are
            advised to wear the Ihram, which consists of two unstitched white
            sheets that must wrap one piece around your shoulder and one around
            your waist.
          </Text>
          <Text
            style={{
              color: COLORS.primary,
              marginVertical: 20,
              fontWeight: '700',
            }}>
            {' '}
            ٱلْحَجُّ أَشْهُرٌ مَّعْلُومَٰتٌ ۚ فَمَن فَرَضَ فِيهِنَّ ٱلْحَجَّ
            فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِى ٱلْحَجِّ ۗ وَمَا
            تَفْعَلُوا۟ مِنْ خَيْرٍ يَعْلَمْهُ ٱللَّهُ ۗ وَتَزَوَّدُوا۟ فَإِنَّ
            خَيْرَ ٱلزَّادِ ٱلتَّقْوَىٰ ۚ وَٱتَّقُونِ يَٰٓأُو۟لِى ٱلْأَلْبَٰبِ{' '}
          </Text>
          <Text
            style={{
              color: '#000',
              marginVertical: 20,
              fontWeight: '700',
            }}>
            Hajj is [during] well-known months, so whoever has made Hajj
            obligatory upon himself therein [by entering the state of ihrām],
            there is [to be for him] no sexual relations and no disobedience and
            no disputing during Hajj. And whatever good you do – Allāh knows it.
            And take provisions, but the best provision is fear of Allāh. And
            fear Me, O you of understanding. (AlQuran 2:197)
          </Text>
        </View>
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
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 50,
    width: 230,
    marginTop: 100,
    backgroundColor: COLORS.bgGrey,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  headerText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
  },
  listContainer: {
    height: '85%',
    width: '100%',
    backgroundColor: COLORS.bgGrey,
    padding: 10,
    borderRadius: 12,
  },
  listItem: {
    marginVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 2,
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  listItemText: {
    fontWeight: '700',
  },
});
