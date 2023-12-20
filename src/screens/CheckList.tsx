import React, {useEffect} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {CheckListItem} from '../components/CheckListItem';
import {IMAGES} from '../constants';
import {useSQLite} from '../hooks/useSql';
import {checkListData} from '../constants/CheckList';

export const CheckList = () => {
  const {loadTable, toggleCheck, checkedValues} = useSQLite();

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
        <FlatList
          data={checkListData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <CheckListItem
              item={item}
              isChecked={checkedValues.includes(item.id)}
              toggleCheck={() => toggleCheck(item.id)}
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
