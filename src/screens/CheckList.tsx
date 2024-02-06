import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CheckListItem} from '../components/CheckListItem';
import {COLORS, IMAGES} from '../constants';
import {useCheckList} from '../hooks/useCheckList';
import {useSQLite} from '../hooks/useSql';

export const CheckList = () => {
  const {loadTable, toggleCheck, checkedValues} = useSQLite();
  const {getDbItems, addCheckListItem} = useCheckList();

  const [newCheckListItem, setNewCheckListItem] = useState('');

  const handleAddClick = () => {
    addCheckListItem({itemName: newCheckListItem});
    setNewCheckListItem('');
  };

  useEffect(() => {
    loadTable();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage}
        resizeMode="contain"
        source={IMAGES.greenIslamic}
      />
      <View style={styles.contentContainer}></View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hajj / Umrah CheckList</Text>
      </View>
      <View style={styles.checkListContainer}>
        <Text style={styles.checkListText}>Check List</Text>
        <View style={{margin: 10, flexDirection: 'row'}}>
          <TextInput
            style={{borderWidth: 1, borderRadius: 8, width: '65%'}}
            value={newCheckListItem}
            onChangeText={newText => setNewCheckListItem(newText)}
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAddClick}>
            <Text style={{color: 'white', fontSize: 18}}>Add</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={getDbItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <CheckListItem
              item={item}
              isChecked={checkedValues.includes(item.id as number)}
              toggleCheck={() => toggleCheck(item.id as number)}
            />
          )}
        />
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
    top: '15%',
    left: '15%',
    zIndex: 1,
  },
  headerText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  checkListContainer: {
    position: 'absolute',
    top: '22%',
    left: '10%',
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 1,
    borderRadius: 12,
    width: '80%',
    height: '60%',
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
