import AsyncStorage from '@react-native-async-storage/async-storage';
import { SavedRoute } from '../types';

const ROUTES_KEY = '@wayremote_routes';

export async function saveRoute(route: SavedRoute): Promise<void> {
  const existing = await getRoutes();
  existing.unshift(route);
  await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(existing));
}

export async function getRoutes(): Promise<SavedRoute[]> {
  const raw = await AsyncStorage.getItem(ROUTES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function deleteRoute(id: string): Promise<void> {
  const existing = await getRoutes();
  const filtered = existing.filter((r) => r.id !== id);
  await AsyncStorage.setItem(ROUTES_KEY, JSON.stringify(filtered));
}
