import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const CameraPicker = ({ onImageSelected }) => {
  const isSimulator = !Constants.isDevice;

  const takePicture = async () => {
    console.log('Camera: Button pressed');

    if (isSimulator) {
      alert('Camera is not available on simulator. Please use a physical device to test this feature.');
      return;
    }

    try {
      // Request camera permission first
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Camera: Result:', result);

      if (!result.canceled) {
        console.log('Camera: Image taken:', result.assets[0]);
        onImageSelected(result.assets[0]);
      } else {
        console.log('Camera: Capture cancelled');
      }
    } catch (error) {
      console.error('Camera: Error:', error);
      alert('Error accessing camera: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.button, isSimulator && styles.disabledButton]} 
        onPress={takePicture}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="camera-alt" size={24} color="white" />
          <Text style={styles.buttonText}>
            {isSimulator ? 'Camera (Unavailable)' : 'Take Picture'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraPicker; 