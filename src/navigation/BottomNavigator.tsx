import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import HomeNavigator from './HomeNavigator';
import MembrosScreen from '../screens/Membros';
import GruposScreen from '../screens/Grupos';
import ChatScreen from '../screens/Chat';
import { Routes } from './routes';
import { colors } from '../theme/colors';

const inicioImg = require('../images/icons/inicio-icon.png');
const membrosImg = require('../images/icons/membro-icon.png');
const gruposImg = require('../images/icons/grupos-icon.png');
const chatImg = require('../images/icons/chat-icon.png');

const bottomTabs = [
  { key: Routes.HOME, label: 'Inicio', imageSource: inicioImg },
  { key: Routes.MEMBROS, label: 'Membros', imageSource: membrosImg },
  { key: Routes.GRUPOS, label: 'Grupos', imageSource: gruposImg },
  { key: Routes.CHAT, label: 'Chat', imageSource: chatImg },
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
