import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailScreen = ({ route }) => {
  const { product, toggleFavorite } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();  // check for if already favourite
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
    toggleFavorite(product); 
    setIsFavorite(!isFavorite); 
    saveFavoritesToAsyncStorage(); 
  };

  const saveFavoritesToAsyncStorage = async () => {
    try {
      let updatedFavorites = [];
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        updatedFavorites = JSON.parse(favorites);
      }
      if (isFavorite) {
        updatedFavorites = updatedFavorites.filter((favProduct) => favProduct.id !== product.id); // remove the product from favorites
      } else {
        updatedFavorites.push(product); // add the product to favorites
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
    </View>
  );
};

export default DetailScreen;
