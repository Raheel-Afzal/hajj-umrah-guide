import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconButton} from '../components';
import AddStepModal from '../components/AddStepModal';
import {COLORS, IMAGES} from '../constants';
import HajjUmrahGuide from '../constants/HajjUmrahGuide.json';
import {HajjUmrah, StepDesc, StepDescDB} from '../models/Model';
import SQLiteDb from '../sql';
import {transformArray} from '../utils/transformStepArray';

export const Steps = ({navigation}: any) => {
  const db = new SQLiteDb<StepDescDB>('HajjUmrahDB');

  //@ts-ignore
  let hajjType: HajjUmrah = useRoute().params.selectedType;

  const [selectedDay, setSelectedDay] = useState(-1);
  const [selectedStep, setSelectedStep] = useState(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const [steps, setSteps] = useState<StepDesc[]>([]);
  const [newStep, setNewStep] = useState<StepDescDB>({
    stepNo: 0,
    step: '',
    name: '',
    arabic: '',
    english: '',
    translation: '',
    type: hajjType,
    day: selectedDay,
  });

  const [stepDropDownCount, setStepDropDownCount] = useState(0);

  const toggle = () => setIsModalOpen(!isModalOpen);

  const getDbSteps = async () => {
    setLoader(true);
    const allDua = await db.getAllRecords('stepDescTable');
    const selectedSteps = HajjUmrahGuide[hajjType][selectedDay]?.steps;

    if (selectedSteps?.length) {
      const getDbSteps = transformArray(allDua);
      let temp = [...selectedSteps];
      getDbSteps.forEach(dbStep => {
        if (dbStep.type == hajjType && dbStep.day == selectedDay) {
          temp.splice(dbStep.stepNo, 0, dbStep);
        }
      });
      setSteps(temp);
    }
    setLoader(false);
  };

  useEffect(() => {
    setNewStep(curr => ({...curr, day: selectedDay}));
  }, [selectedDay]);

  useEffect(() => {
    getDbSteps();
  }, [newStep, selectedDay]);

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
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

  const handleAddBtn = (count: number) => {
    setStepDropDownCount(count);
    setIsModalOpen(true);
  };

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
            loader ? (
              <View>
                <Text style={styles.loadingText}>LOADING....</Text>
              </View>
            ) : (
              <View>
                <FlatList
                  data={steps}
                  renderItem={({item, index}) => (
                    <React.Fragment>
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
                      {index == steps.length - 1 && (
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => handleAddBtn(index + 2)}>
                          <Text style={styles.addText}>Add</Text>
                        </TouchableOpacity>
                      )}
                    </React.Fragment>
                  )}
                />
              </View>
            )
          ) : (
            <ScrollView>
              <Text style={styles.duaName}>
                {steps[selectedStep].dua?.name}
              </Text>
              <View style={[styles.listItem, {alignItems: 'flex-end'}]}>
                <Text style={[styles.duaText, {color: 'red'}]}>
                  {steps[selectedStep].dua?.arabic}
                </Text>
              </View>
              <Text style={{marginTop: 15}}>English:</Text>
              <Text style={[styles.duaText, styles.duaText2]}>
                {steps[selectedStep].dua?.english}
              </Text>
              <Text style={{marginTop: 15}}>Translation:</Text>

              <Text style={[styles.duaText, styles.duaText2]}>
                {steps[selectedStep].dua?.translation}
              </Text>
            </ScrollView>
          )}
        </View>
      </View>
      <AddStepModal
        type={hajjType}
        selectedDay={selectedDay}
        newStep={newStep}
        setNewStep={setNewStep}
        stepDropDownCount={stepDropDownCount}
        isOpen={isModalOpen}
        toggle={toggle}
      />
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
  addStepWrapper: {
    flexDirection: 'row',
    width: '100%',
  },
  addBtn: {
    backgroundColor: COLORS.greenLight,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
    borderRadius: 12,
  },
  addText: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 32,
    textAlign: 'center',
    marginTop: 150,
    borderRadius: 12,
    padding: 20,
    color: 'white',
    backgroundColor: COLORS.greenLight,
  },
});

export default Steps;
