export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RoutePoint extends Coordinate {
  timestamp: number;
  speed: number | null;
  altitude: number | null;
}

export interface SavedRoute {
  id: string;
  name: string;
  points: RoutePoint[];
  startedAt: number;
  endedAt: number;
  distance: number;
}
