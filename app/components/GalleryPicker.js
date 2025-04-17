import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const GalleryPicker = ({ onImageSelected }) => {
  const pickImage = async () => {
    console.log('Gallery: Button pressed');
    try {
      // Request permission first
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log('Gallery: Result:', result);

      if (!result.canceled) {
        console.log('Gallery: Image selected:', result.assets[0]);
        onImageSelected(result.assets[0]);
      } else {
        console.log('Gallery: Selection cancelled');
      }
    } catch (error) {
      console.error('Gallery: Error:', error);
      alert('Error accessing gallery: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button} 
        onPress={pickImage}
        activeOpacity={0.7}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="photo-library" size={24} color="white" />
          <Text style={styles.buttonText}>Choose from Gallery</Text>
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
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 10,
    width: '80%',
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

export default GalleryPicker; 