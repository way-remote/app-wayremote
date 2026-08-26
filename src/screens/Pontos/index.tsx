import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import {
  requestPermissions,
  startTracking,
  stopTracking,
  getLivePoints,
  getTotalDistance,
  setOnPointUpdate,
  clearLivePoints,
} from '../../services/location';
import { saveRoute } from '../../services/storage';
import { RoutePoint } from '../../types';
import { styles } from './style';

export default function PontosScreen() {
  const [tracking, setTracking] = useState(false);
  const [points, setPoints] = useState<RoutePoint[]>([]);
  const [distance, setDistance] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (tracking && startTime) {
      timer = setInterval(() => setElapsed(Date.now() - startTime), 1000);
    }
    return () => clearInterval(timer);
  }, [tracking, startTime]);

  useEffect(() => {
    if (tracking) {
      setOnPointUpdate((point) => {
        setPoints((prev) => {
          const next = [...prev, point];
          setDistance(getTotalDistance(next));
          return next;
        });
      });
    } else {
      setOnPointUpdate(null);
    }
    return () => setOnPointUpdate(null);
  }, [tracking]);

  const handleStart = async () => {
    const ok = await requestPermissions();
    if (!ok) {
      Alert.alert('Permissao negada', 'Conceda permissoes de localizacao (sempre) para rastrear.');
      return;
    }
    clearLivePoints();
    setPoints([]);
    setDistance(0);
    setStartTime(Date.now());
    setElapsed(0);
    await startTracking();
    setTracking(true);
  };

  const handleStop = async () => {
    await stopTracking();
    setTracking(false);
    const finalPoints = getLivePoints();
    if (finalPoints.length > 1) {
      Alert.alert('Salvar rota?', 'Deseja salvar esta rota no historico?', [
        { text: 'Nao', style: 'cancel' },
        {
          text: 'Sim',
          onPress: async () => {
            await saveRoute({
              id: Date.now().toString(),
              name: `Rota ${new Date().toLocaleDateString('pt-BR')}`,
              points: finalPoints,
              startedAt: startTime!,
              endedAt: Date.now(),
              distance: getTotalDistance(finalPoints),
            });
          },
        },
      ]);
    }
  };

  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Distancia</Text>
          <Text style={styles.statValue}>{(distance / 1000).toFixed(2)} km</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Tempo</Text>
          <Text style={styles.statValue}>{formatTime(elapsed)}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Pontos</Text>
          <Text style={styles.statValue}>{points.length}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Velocidade</Text>
          <Text style={styles.statValue}>
            {points.length > 0 && points[points.length - 1].speed != null
              ? `${(points[points.length - 1].speed! * 3.6).toFixed(1)} km/h`
              : '--'}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, tracking ? styles.stopBtn : styles.startBtn]}
        onPress={tracking ? handleStop : handleStart}
      >
        <Text style={styles.buttonText}>{tracking ? 'Parar Rastreamento' : 'Iniciar Rastreamento'}</Text>
      </TouchableOpacity>

      {tracking && (
        <View style={styles.liveIndicator}>
          <View style={styles.dot} />
          <Text style={styles.liveText}>AO VIVO</Text>
        </View>
      )}
    </View>
  );
}
