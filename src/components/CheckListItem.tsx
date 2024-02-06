import {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {CheckListItemT} from '../models/Model';

interface Props {
  item: CheckListItemT;
  isChecked: boolean;
  toggleCheck: () => void;
}

export const CheckListItem: FC<Props> = ({item, isChecked, toggleCheck}) => {
  return (
    <View style={styles.CheckListItem}>
      <View style={styles.checkListItemHeader}>
        <CheckBox value={isChecked} onValueChange={toggleCheck} />
        <Text
          style={{fontSize: 14, color: 'black', fontWeight: '700', flex: 2}}>
          {item.itemName}
        </Text>
        {/* <Image
          source={item.image}
          style={{height: 50, width: 50, flex: 1}}
          resizeMode="contain"
        /> */}
      </View>
      {/* {item.desc.map((description, index) => (
        <Text key={index} style={{marginTop: 5, fontSize: 10}}>
          ▪️ {description}
        </Text>
      ))} */}
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
  CheckListItem: {
    padding: 10,
    margin: 10,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#fff',
  },
  checkListItemHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    // borderBottomWidth: 1,
    borderBottomColor: '#b6b6b6',
    paddingBottom: 10,
  },
});
