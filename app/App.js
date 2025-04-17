import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import CameraPicker from './components/CameraPicker';
import GalleryPicker from './components/GalleryPicker';

export default function App() {
  const [image, setImage] = useState(null);

  const handleImageSelected = (selectedImage) => {
    console.log('App: Image selected:', selectedImage);
    setImage(selectedImage);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assistive AI</Text>
      <Text style={styles.subtitle}>Take a picture or choose from gallery</Text>
      
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image.uri }} style={styles.image} />
          <TouchableOpacity 
            style={styles.removeButton}
            onPress={handleRemoveImage}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <CameraPicker onImageSelected={handleImageSelected} />
      <GalleryPicker onImageSelected={handleImageSelected} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  removeButton: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: '#FF3B30',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
}); 