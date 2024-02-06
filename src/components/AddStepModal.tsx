import {Picker} from '@react-native-picker/picker';
import React, {FC, useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants';
import {useStepSql} from '../hooks/useStepSql';
import {HajjUmrah, StepDesc, StepDescDB} from '../models/Model';
import {isStepValid} from '../utils/isStepValid';

interface Props {
  type: HajjUmrah;
  selectedDay: number;
  stepDropDownCount: number;
  isOpen: boolean;
  newStep: StepDescDB;
  setNewStep: React.Dispatch<React.SetStateAction<StepDescDB>>;
  toggle: () => void;
}

const AddStepModal: FC<Props> = ({
  type,
  selectedDay,
  stepDropDownCount,
  isOpen,
  newStep,
  setNewStep,
  toggle,
}) => {
  const {addStep} = useStepSql();

  const handleInputChange = (key: keyof StepDescDB, value: string) => {
    setNewStep(prevStep => ({
      ...prevStep,
      [key]: value,
    }));
  };

  const handleAdd = () => {
    if (!isStepValid(newStep)) {
      return Alert.alert('Warning', 'Step Description field is Required');
    }
    addStep(newStep);
    setNewStep({
      stepNo: stepDropDownCount,
      step: '',
      name: '',
      arabic: '',
      english: '',
      translation: '',
      type: type,
      day: selectedDay,
    });
    toggle();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={toggle}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeBtn} onPress={toggle}>
              <Text style={{color: 'white'}}>X</Text>
            </TouchableOpacity>

            <Picker
              style={styles.picker}
              selectedValue={stepDropDownCount}
              onValueChange={newValue => {
                setNewStep(curr => ({...curr, stepNo: newValue}));
              }}>
              {Array.from({length: stepDropDownCount}, (_, index) => (
                <Picker.Item key={index} label={`${index + 1}`} value={index} />
              )).reverse()}
            </Picker>
            {Object.keys(newStep).map(key => {
              // List of keys to exclude
              const excludedKeys = ['stepNo', 'type', 'day'];

              // Check if the current key should be excluded
              if (!excludedKeys.includes(key)) {
                return (
                  <TextInput
                    key={key}
                    value={String(newStep[key as keyof StepDescDB])}
                    onChangeText={text =>
                      handleInputChange(key as keyof StepDescDB, text)
                    }
                    style={styles.inputText}
                    placeholder={`Enter ${key}`}
                  />
                );
              }

              // Return null for excluded keys
              return null;
            })}

            <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
              <Text style={styles.addText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    top: '20%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  closeBtn: {
    position: 'absolute',
    right: -10,
    top: -10,
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 50,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
  inputText: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 12,
    borderColor: COLORS.primary,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: 'white',
    elevation: 2,
  },
});

export default AddStepModal;
