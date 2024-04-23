// DetailScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const { product, toggleFavorite } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if the product is already a favorite when the component mounts
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favoriteProducts = JSON.parse(favorites);
        setIsFavorite(favoriteProducts.some((favProduct) => favProduct.id === product.id));
      }
    } catch (error) {
      console.error('Error checking favorite status from AsyncStorage:', error);
    }
  };

  const handleToggleFavorite = async () => {
    toggleFavorite(product); // Toggle favorite status in HomeScreen
    setIsFavorite(!isFavorite); // Update favorite status locally
    saveFavoritesToAsyncStorage(); // Save updated favorites to AsyncStorage
  };

  const saveFavoritesToAsyncStorage = async () => {
    try {
      let updatedFavorites = [];
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        updatedFavorites = JSON.parse(favorites);
      }
      if (isFavorite) {
        // Remove the product from favorites
        updatedFavorites = updatedFavorites.filter((favProduct) => favProduct.id !== product.id);
      } else {
        // Add the product to favorites
        updatedFavorites.push(product);
      }
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{product.title}</Text>
      <Image source={{ uri: product.thumbnail }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
      <Text>Description: {product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Button
        title={isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        onPress={handleToggleFavorite}
      />
      {/* Display more details of the product */}
    </View>
  );
};

export default DetailScreen;
