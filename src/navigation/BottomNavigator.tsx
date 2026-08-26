import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import HomeNavigator from './HomeNavigator';
import MembrosScreen from '../screens/Membros';
import GruposScreen from '../screens/Grupos';
import ChatScreen from '../screens/Chat';
import { Routes } from './routes';
import { colors } from '../theme/colors';

const bottomTabs = [
  { key: Routes.HOME, label: 'Inicio', icon: 'home' as const },
  { key: Routes.MEMBROS, label: 'Membros', icon: 'people' as const },
  { key: Routes.GRUPOS, label: 'Grupos', icon: 'people-circle' as const },
  { key: Routes.CHAT, label: 'Chat', icon: 'chatbubbles' as const },
];

export default function BottomNavigator() {
  const [activeTab, setActiveTab] = useState<string>(Routes.HOME);

  const renderScreen = () => {
    switch (activeTab) {
      case Routes.HOME:
        return <HomeNavigator />;
      case Routes.MEMBROS:
        return <MembrosScreen />;
      case Routes.GRUPOS:
        return <GruposScreen />;
      case Routes.CHAT:
        return <ChatScreen />;
      default:
        return <HomeNavigator />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>
      <BottomTabBar tabs={bottomTabs} activeTab={activeTab} onTabPress={setActiveTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
