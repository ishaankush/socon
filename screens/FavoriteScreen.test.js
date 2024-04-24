import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FavoriteScreen from './FavoriteScreen';

// mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

describe('FavoriteScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays "No favorite items" when no favorite products stored', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce(null);

    const { getByText } = render(<FavoriteScreen />);

    await waitFor(() => {
      expect(getByText('No favorite items found')).toBeTruthy();
    });
  });

  it('displays favorite products when there arefavorite items', async () => {
    // mock AsyncStorage to getItem 
    const mockFavorites = [
      { id: 1, title: 'Favorite Product 1', thumbnail: 'url1' },
      { id: 2, title: 'Favorite Product 2', thumbnail: 'url2' },
    ];
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockFavorites));

    const { getByText } = render(<FavoriteScreen />);

    await waitFor(() => {
      expect(getByText('Favorite Product 1')).toBeTruthy();
      expect(getByText('Favorite Product 2')).toBeTruthy();
    });
  });
});
