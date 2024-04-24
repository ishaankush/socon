// HomeScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch data and load favorites when component mounts
    fetchProducts();
    loadFavorites();
  }, []);

  // Fetching the products from api 
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 // loading the state of favourite items 
  const loadFavorites = async () => {
    try {
      const jsonFavorites = await AsyncStorage.getItem('favorites');
      if (jsonFavorites) {
        setFavorites(JSON.parse(jsonFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from AsyncStorage:', error);
    }
  };

  // to save favroite in async storage 
  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };

  // to change the state of item in favourite or not
  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);
    if (isFavorite) {
      // Remove from favorites
      setFavorites(favorites.filter((favProduct) => favProduct.id !== product.id));
    } else {
      // Add to favorites if not exceeding the limit
      if (favorites.length < 5) {
        setFavorites([...favorites, product]);
      } else {
        // Alert user if trying to add more than 5 favorites
        Alert.alert('Maximum Favorites Reached', 'You can only mark up to 5 items as favorites.');
      }
    }
  };
  // Save favorites to AsyncStorage after updating state
  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  // Flatlist data of products
  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { product: item, toggleFavorite })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Image source={{ uri: item.thumbnail }} style={{ width: 50, height: 50, marginRight: 10 }} />
          <Text>{item.title}</Text>
        </View>
        <Button
          title={favorites.some((favProduct) => favProduct.id === item.id) ? 'Remove Favorite' : 'Add Favorite'}
          onPress={() => toggleFavorite(item)}
          style={{ position: 'absolute', right: 10 }}
        />
    </View>

    </TouchableOpacity>
  );

  return (
    <View>
       <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search',{toggleFavorite})}
      />
      <Button
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : '')} // Add a null check for item.id
      />
    </View>
  );
};

export default HomeScreen;
