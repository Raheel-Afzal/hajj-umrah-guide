import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TabSelector from '../components/TabSelector';
import {COLORS, IMAGES} from '../constants';
import {useDuaSql} from '../hooks/useDuaSql';
import {Dua, GroupedArray} from '../models/Model';
import {groupBy} from '../utils/groupBy';

export const AddDua = ({navigation}: any) => {
  const {addDua, getAllDuas} = useDuaSql();

  const [groupedData, setGroupedData] = useState<GroupedArray>();

  useEffect(() => {
    let groupedData = groupBy(getAllDuas, 'step');
    setGroupedData(groupedData);
  }, [getAllDuas]);

  const [selectedStep, setSelectedStep] = useState('');

  const initialState = {
    dua: '',
    personName: '',
    step: 'MINA',
  };
  const [duaDetail, setDuaDetail] = useState<Dua>(initialState);

  type StepsDua = {
    [key: string]: string;
  };

  let stepsDua: StepsDua = {
    MINA: 'MINA KI DUA',
    MIKAT: 'MIKAT KI DUA',
    TAWAF: 'TAWAF KI DUA',
  };

  const [activeTab, setActiveTab] = useState(0);

  const handleAddDua = () => {
    if (!duaDetail.dua || !duaDetail.personName || !duaDetail.step) {
      return Alert.alert('Warning', 'You need fill each field.');
    }
    addDua(duaDetail);
    setDuaDetail(initialState);
  };

  const renderItem = ({item}: {item: Dua}) => {
    return (
      <View style={styles.duaListViewNested}>
        <View>
          <Text style={styles.duaListItemNested}>Dua: {item.dua}</Text>
        </View>
        <Text style={styles.duaListItemNested}>
          Person Name: {item.personName}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image style={styles.coverImage} source={IMAGES.cover} />

      <View style={styles.box}>
        <Text style={styles.title}>Requested Dua</Text>
        <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 0 ? (
          <React.Fragment>
            <Text style={styles.label}>Dua</Text>
            <TextInput
              value={duaDetail.dua}
              onChangeText={text =>
                setDuaDetail(curr => ({...curr, dua: text}))
              }
              style={styles.inputText}
              placeholder="Enter the Dua you want to prayer"
            />
            <Text style={styles.label}>Enter Person Name</Text>
            <TextInput
              value={duaDetail.personName}
              onChangeText={text =>
                setDuaDetail(curr => ({...curr, personName: text}))
              }
              style={styles.inputText}
              placeholder="Enter the person name "
            />
            <Text style={styles.label}>Step</Text>

            <Picker
              style={styles.picker}
              selectedValue={selectedStep}
              onValueChange={newValue => {
                setSelectedStep(newValue);
                setDuaDetail(curr => ({...curr, step: newValue}));
              }}>
              {Object.keys(stepsDua).map((step, index) => (
                <Picker.Item key={index} label={step} value={step} />
              ))}
            </Picker>

            <TouchableOpacity onPress={handleAddDua}>
              <Text style={{...styles.title, marginTop: 15}}>Add Dua</Text>
            </TouchableOpacity>
          </React.Fragment>
        ) : groupedData ? (
          <FlatList
            data={Object.keys(groupedData)}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <React.Fragment>
                <View style={styles.duaListView}>
                  <Text style={styles.duaListItem}>Step Name: {item}</Text>
                  <Text style={styles.duaListItem}>Dua: {stepsDua[item]}</Text>
                </View>
                <FlatList
                  data={groupedData[item]}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                />
              </React.Fragment>
            )}
          />
        ) : (
          <View>
            <Text>No data to show</Text>
          </View>
        )}
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
  picker: {
    width: '80%',
    backgroundColor: 'white',
    elevation: 2,
  },
  box: {
    alignItems: 'center',
    padding: 10,
    paddingVertical: 20,
    top: -220,
    height: 540,
    width: 360,
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
  duaListView: {
    margin: 10,
    elevation: 2,
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.greenLight,
  },
  duaListViewNested: {
    margin: 5,
    elevation: 1,
    marginHorizontal: 30,
    padding: 10,
    borderRadius: 12,
    backgroundColor: COLORS.bgGrey,
  },
  duaListItem: {
    fontSize: 20,
    color: 'white',
  },
  duaListItemNested: {
    fontSize: 20,
    color: COLORS.primary,
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
    width: '76%',
  },
  text: {
    marginVertical: 5,
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
  inputText: {
    borderWidth: 1,
    width: '80%',
    borderRadius: 12,
    borderColor: COLORS.primary,
    paddingHorizontal: 15,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    marginLeft: 40,
    marginTop: 20,
    paddingBottom: 10,
  },
});
