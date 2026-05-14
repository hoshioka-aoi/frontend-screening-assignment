import { FlightLog, RouteStats } from "../types";

export function computeRouteStats(logs: FlightLog[]): Record<string, RouteStats> {
  const departures = logs.filter((l) => l.type === "departure");
  const arrivals   = logs.filter((l) => l.type === "arrival");
  const stats: Record<string, RouteStats> = {};

  for (const dep of departures) {
    const arrival = arrivals.find((a) => a.passengerName === dep.passengerName);
    if (!arrival) continue;

    const route = `${dep.airport} -> ${arrival.airport}`;
    const travelTime = arrival.timestamp - dep.timestamp;

    if (!stats[route]) stats[route] = { total: 0, count: 0 };
    stats[route].total += travelTime;
    stats[route].count += 1;
  }

  return stats;
}

export function formatDuration(seconds: number): string {
  if (seconds < 60)   return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
}