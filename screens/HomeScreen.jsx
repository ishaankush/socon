// ProductListScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', { product: item })}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image source={{ uri: item.thumbnail }} style={{ width: 50, height: 50, marginRight: 10 }} />
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
