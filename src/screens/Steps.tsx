import {useRoute} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import {Hajj, Umrah} from '../Enums';
import HajjUmrahGuide from '../constants/HajjUmrahGuide.json';
import {COLORS, IMAGES} from '../constants';
import {IconButton} from '../components';

export const Steps = ({navigation}: any) => {
  type HajjUmrah = `${Hajj}` | `${Umrah}`;
  //@ts-ignore
  let hajjType: HajjUmrah = useRoute().params.selectedType;

  const [selectedDay, setSelectedDay] = useState(-1);
  const [selectedStep, setSelectedStep] = useState(-1);
  console.log('selectedStep: ', selectedStep);
  console.log('selectedDay: ', selectedDay);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        console.log('e: ', e);
        if (selectedDay === -1 && selectedStep === -1) {
          navigation.dispatch(e.data.action);
        }

        if (selectedStep !== -1) {
          console.log('insterted selectedStep: ', selectedStep);
          setSelectedStep(-1);
        }
        if (selectedStep === -1 && selectedDay !== -1) {
          console.log('insterted selectedStep: ', selectedStep);
          setSelectedDay(-1);
        }
        e.preventDefault();
      }),
    [navigation, selectedDay, selectedStep],
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="contain"
        source={IMAGES.greenIslamic}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {selectedDay !== -1
              ? HajjUmrahGuide[hajjType][selectedDay].day
              : `Days of ${hajjType}`}
          </Text>
          {selectedDay === -1 && (
            <Text style={styles.subText}>Tap on day to see details</Text>
          )}
        </View>
        <View style={styles.listContainer}>
          {selectedDay === -1 ? (
            <FlatList
              data={HajjUmrahGuide[hajjType]}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  key={index}
                  style={styles.listItem}
                  onPress={() => setSelectedDay(index)}>
                  <Text style={styles.listItemText}>
                    {index + 1}. {item.day}
                  </Text>
                </TouchableOpacity>
              )}
            />
          ) : selectedStep === -1 ? (
            <FlatList
              data={HajjUmrahGuide[hajjType][selectedDay].steps}
              renderItem={({item, index}) => (
                <View key={index} style={styles.listItem}>
                  <Text style={styles.listItemText}>
                    {index + 1}. {item.step}
                  </Text>
                  {item.dua && (
                    <View style={styles.stepsView}>
                      <Text style={styles.duaText}>{item.dua.name}</Text>
                      <IconButton
                        icon={IMAGES.dua}
                        bg={COLORS.greenLight}
                        onPress={() => setSelectedStep(index)}
                      />
                    </View>
                  )}
                </View>
              )}
            />
          ) : (
            <ScrollView>
              <Text style={styles.duaName}>
                {
                  HajjUmrahGuide[hajjType][selectedDay].steps[selectedStep].dua
                    ?.name
                }
              </Text>
              <View style={[styles.listItem, {alignItems: 'flex-end'}]}>
                <Text style={[styles.duaText, {color: 'red'}]}>
                  {
                    HajjUmrahGuide[hajjType][selectedDay].steps[selectedStep]
                      .dua?.arabic
                  }
                </Text>
              </View>
              <Text style={{marginTop: 15}}>English:</Text>
              <Text style={[styles.duaText, styles.duaText2]}>
                {
                  HajjUmrahGuide[hajjType][selectedDay].steps[selectedStep].dua
                    ?.english
                }
              </Text>
              <Text style={{marginTop: 15}}>Translation:</Text>

              <Text style={[styles.duaText, styles.duaText2]}>
                {
                  HajjUmrahGuide[hajjType][selectedDay].steps[selectedStep].dua
                    ?.translation
                }
              </Text>
            </ScrollView>
          )}
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
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderRadius: 12,
  },
  headerText: {
    fontSize: 25,
    textAlign: 'center',
    color: COLORS.bgGrey,
    fontWeight: '700',
  },
  listContainer: {
    height: '65%',
    width: '100%',
    backgroundColor: COLORS.bgGrey,
    padding: 10,
    borderRadius: 12,
  },
  listItem: {
    marginVertical: 5,
    padding: 12,
    marginHorizontal: 2,
    // height: 50,

    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  stepsView: {
    width: '100%',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  listItemText: {
    color: COLORS.primary,
    fontWeight: '700',
  },
  duaName: {
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 10,
  },
  subText: {
    color: COLORS.bgGrey,
  },
  duaText: {
    color: COLORS.greenLight,
    fontWeight: '700',
    fontSize: 16,
    marginRight: 10,
  },
  duaText2: {
    color: COLORS.primary,
    margin: 10,
    fontSize: 14,
  },
});

export default Steps;
