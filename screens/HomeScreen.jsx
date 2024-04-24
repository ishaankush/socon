import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  // api call
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
 
   
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

  

  const toggleFavorite = (product) => {
    const isFavorite = favorites.some((favProduct) => favProduct.id === product.id);
    if (isFavorite) {
      
      setFavorites(favorites.filter((favProduct) => favProduct.id !== product.id));
    } else {
      if (favorites.length < 5) {
        setFavorites([...favorites, product]);
      } else {
        Alert.alert('Maximum Favorites Items Reached', 'You can only mark up to 5 items as favorites.');
      }
    }
  };

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to AsyncStorage:', error);
    }
  };
  
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

  
  const renderFlatList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const itemsForPage = products.slice(startIndex, endIndex);

    return (
      <FlatList
        data={itemsForPage}
        renderItem={renderProductItem}
        keyExtractor={(item) => (item.id ? item.id.toString() : '')}
      />
    );
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Go to Search"
        onPress={() => navigation.navigate('Search', { toggleFavorite })}
      />
      <Button
        title="View Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
      {renderFlatList()}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 10 }}>
        <Button title="Previous" onPress={goToPreviousPage} disabled={currentPage === 1} />
        <Text style={{ marginHorizontal: 10, marginVertical:10 }}>{`Page ${currentPage}`}</Text>
        <Button title="Next" onPress={goToNextPage} disabled={currentPage === Math.ceil(products.length / itemsPerPage)} />
      </View>
    </View>
  );
};

export default HomeScreen;
