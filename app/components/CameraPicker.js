import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const CameraPicker = ({ onImageSelected }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const isSimulator = Constants.appOwnership === 'expo' && !Constants.isDevice;

  useEffect(() => {
    (async () => {
      if (!isSimulator) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const takePhoto = async () => {
    try {
      if (isSimulator) {
        Alert.alert(
          'Simulator Detected',
          'Camera is not available in the simulator. Please use a physical device.',
          [{ text: 'OK' }]
        );
        return;
      }

      if (!hasPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant camera access in your device settings to use this feature.',
          [{ text: 'OK' }]
        );
        return;
      }

      // Launch camera
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0]);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo');
    }
  };

  const buttonDisabled = isSimulator || hasPermission === false;
  const buttonText = isSimulator 
    ? 'Camera (Unavailable)' 
    : hasPermission === false 
      ? 'Camera (No Permission)' 
      : 'Camera';

  return (
    <TouchableOpacity
      style={[styles.button, buttonDisabled && styles.buttonDisabled]}
      onPress={takePhoto}
      disabled={buttonDisabled}
    >
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CameraPicker; 