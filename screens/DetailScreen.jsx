// ProductDetailScreen.js

import React from 'react';
import { View, Text, Image } from 'react-native';

const DetailScreen = ({ route }) => {
  const { product } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{product.title}</Text>
      <Image source={{ uri: product.thumbnail }} style={{ width: '100%', height: 200, marginBottom: 10 }} />
      <Text>Description: {product.description}</Text>
      <Text>Price: ${product.price}</Text>
      {/* Display more details of the product */}
    </View>
  );
};

export default DetailScreen;
