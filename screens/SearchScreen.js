import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const SearchScreen = ({ route,navigation }) => {
  const {toggleFavorite } = route.params;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get('https://dummyjson.com/products');
      const products = response.data.products;
      const results = products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Error fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePressProduct = (product) => {
    navigation.navigate('Detail', { product,toggleFavorite });
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity onPress={() => handlePressProduct(item)}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image source={{ uri: item.thumbnail }} style={{ width: 50, height: 50, marginRight: 10 }} />
        <Text>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View>
      <TextInput
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        disabled={isLoading}
      />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>{error}</Text>}
      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderProductItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        !isLoading && <Text>No results found</Text>
      )}
    </View>
  );
};

export default SearchScreen;
