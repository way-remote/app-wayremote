import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getRoutes, deleteRoute } from '../../services/storage';
import { SavedRoute } from '../../types';
import { styles } from './style';

export default function HistoricoScreen() {
  const [routes, setRoutes] = useState<SavedRoute[]>([]);

  useFocusEffect(
    useCallback(() => {
      getRoutes().then(setRoutes);
    }, [])
  );

  const handleDelete = (id: string) => {
    Alert.alert('Excluir rota?', 'Essa acao nao pode ser desfeita.', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteRoute(id);
          setRoutes((prev) => prev.filter((r) => r.id !== id));
        },
      },
    ]);
  };

  const formatDuration = (start: number, end: number) => {
    const ms = end - start;
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    if (h > 0) return `${h}h ${m % 60}min`;
    return `${m}min ${s % 60}s`;
  };

  const renderItem = ({ item }: { item: SavedRoute }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text style={styles.deleteBtn}>Excluir</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardStat}>
          {item.points.length} pontos | {(item.distance / 1000).toFixed(2)} km
        </Text>
        <Text style={styles.cardStat}>
          {formatDuration(item.startedAt, item.endedAt)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {routes.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Nenhuma rota salva ainda</Text>
          <Text style={styles.emptyHint}>Inicie um rastremaneto e salve a rota</Text>
        </View>
      ) : (
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}
