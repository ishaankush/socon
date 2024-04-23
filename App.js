import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from './screens/DetailScreen';
import FavoriteScreen from './screens/FavoriteScreen'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Welcome'}}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Favorites" component={FavoriteScreen} options={{ title: 'Favorites' }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}


