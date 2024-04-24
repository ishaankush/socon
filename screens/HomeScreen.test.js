import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => require('../__mocks__/mock-async-storage'));


describe('HomeScreen', () => {
  it('renders without crashing', () => {
    render(<HomeScreen />);
  });

  it('navigates to the Search screen when " Search" button is pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const goToSearchButton = getByText('Go to Search');

    fireEvent.press(goToSearchButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Search', expect.any(Object));
  });

  it('navigates to the favorites screen when "View Favorites" button pressed', () => {
    const mockNavigation = { navigate: jest.fn() };
    const { getByText } = render(<HomeScreen navigation={mockNavigation} />);
    const viewFavoritesButton = getByText('View Favorites');

    fireEvent.press(viewFavoritesButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Favorites');
  });

  
});
