import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import CameraPicker from './components/CameraPicker';
import GalleryPicker from './components/GalleryPicker';

export default function App() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const speakResult = async (text) => {
    try {
      await Speech.speak(text, {
        language: 'en',
        pitch: 1,
        rate: 1,
      });
    } catch (error) {
      console.error('Speech error:', error);
    }
  };

  const handleImageSelected = (selectedImage) => {
    setImage(selectedImage);
    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  const uploadImage = async (selectedImage) => {
    if (!selectedImage) return;
  
    const uriParts = selectedImage.uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
  
    const formData = new FormData();
    formData.append('file', {
      uri: selectedImage.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
  
    try {
      setUploading(true);
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const result = await response.json();
      const predictionText = result.label || 'No object detected';
      speakResult(`${predictionText}`);
    } catch (err) {
      const errorMessage = 'An error occurred while analyzing the image';
      Alert.alert('Error', errorMessage);
      speakResult(errorMessage);
    } finally {
      setUploading(false);
    }
  };
  

  const handleRemoveImage = () => {
    setImage(null);
  };

  function testServerHealth() {
    fetch(`${process.env.EXPO_PUBLIC_API_URL}/health`)
      .then(response => response.json())
      .then(data => console.log('Server health:', data))
      .catch(error => console.error('Server health check failed:', error));
  }

  useEffect(() => {
    testServerHealth();
  }, []);

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

      {uploading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Analyzing image...</Text>
          </View>
        </View>
      )}
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
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
}); 