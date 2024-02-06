import React, {FC, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {COLORS} from '../constants';

interface props {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const TabSelector: FC<props> = ({activeTab, setActiveTab}) => {
  return (
    <View style={styles.tabView}>
      <TouchableOpacity onPress={() => setActiveTab(0)}>
        <Text style={[styles.tab, activeTab === 0 && styles.activeTab]}>
          Add
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActiveTab(1)}>
        <Text style={[styles.tab, activeTab === 1 && styles.activeTab]}>
          View
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabSelector;
const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    backgroundColor: COLORS.bgGrey,
    borderRadius: 12,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    fontSize: 20,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    color: 'white',
    borderRadius: 12,
  },
});
