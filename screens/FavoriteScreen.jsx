// FavoriteScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteScreen = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    // Load favorite products when component mounts
    loadFavoriteProducts();
  }, []);

  const loadFavoriteProducts = async () => {
    try {
      const jsonFavorites = await AsyncStorage.getItem('favorites');
      if (jsonFavorites) {
        setFavoriteProducts(JSON.parse(jsonFavorites));
      }
    } catch (error) {
      console.error('Error loading favorite products from AsyncStorage:', error);
    }
  };

  return (
    <View>
      {favoriteProducts.length > 0 ? (
        <FlatList
          data={favoriteProducts}
          renderItem={({ item }) => (
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
              <Image source={{ uri: item.thumbnail }} style={{ width: 50, height: 50, marginRight: 10 }} />
              <Text>{item.title}</Text>
            </View>
          )}
          keyExtractor={(item) => (item.id ? item.id.toString() : '')}
        />
      ) : (
        <Text style={{color:'red', fontSize:20}}>No favorite items found</Text>
      )}
    </View>
  );
};

export default FavoriteScreen;
