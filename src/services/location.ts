import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { RoutePoint } from '../types';

export const BACKGROUND_LOCATION_TASK = 'wayremote-background-location';

let livePoints: RoutePoint[] = [];
let onPointUpdate: ((point: RoutePoint) => void) | null = null;

export function setOnPointUpdate(cb: ((point: RoutePoint) => void) | null) {
  onPointUpdate = cb;
}

export function getLivePoints(): RoutePoint[] {
  return [...livePoints];
}

export function clearLivePoints() {
  livePoints = [];
}

export function getTotalDistance(points: RoutePoint[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += haversine(points[i - 1], points[i]);
  }
  return total;
}

export function haversine(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }): number {
  const R = 6371e3;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const sinLat = Math.sin(dLat / 2);
  const sinLon = Math.sin(dLon / 2);
  const h = sinLat * sinLat + Math.cos((a.latitude * Math.PI) / 180) * Math.cos((b.latitude * Math.PI) / 180) * sinLon * sinLon;
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

export async function requestPermissions(): Promise<boolean> {
  const { status: fg } = await Location.requestForegroundPermissionsAsync();
  if (fg !== 'granted') return false;
  const { status: bg } = await Location.requestBackgroundPermissionsAsync();
  return bg === 'granted';
}

export async function startTracking(): Promise<void> {
  const defined = await TaskManager.isTaskDefined(BACKGROUND_LOCATION_TASK);
  if (!defined) {
    TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({ data, error }): Promise<void> => {
      if (error || !data) return Promise.resolve();
      const { locations } = data as { locations: Location.LocationObject[] };
      for (const loc of locations) {
        const point: RoutePoint = {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          timestamp: loc.timestamp,
          speed: loc.coords.speed,
          altitude: loc.coords.altitude,
        };
        livePoints.push(point);
        onPointUpdate?.(point);
      }
      return Promise.resolve();
    });
  }
  await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
    accuracy: Location.Accuracy.High,
    distanceInterval: 10,
    deferredUpdatesInterval: 5000,
    showsBackgroundLocationIndicator: true,
    foregroundService: {
      notificationTitle: 'WayRemote',
      notificationBody: 'Rastreamento GPS ativo',
      notificationColor: '#176B43',
    },
  });
}

export async function stopTracking(): Promise<void> {
  const started = await Location.hasStartedLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  if (started) {
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }
}

export async function getCurrentLocation(): Promise<Location.LocationObject> {
  return Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
}
