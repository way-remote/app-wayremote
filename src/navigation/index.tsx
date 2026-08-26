import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNavigator from './BottomNavigator';
import AppHeader from '../components/AppHeader';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <AppHeader />
      <BottomNavigator />
    </NavigationContainer>
  );
}
