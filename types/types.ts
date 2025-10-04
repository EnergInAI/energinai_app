// A single object to hold all real-time energy metrics
export interface EnergyDataState {
  load: LoadMetrics;
  generation: GenMetrics;
}

// Metrics for grid consumption
export interface LoadMetrics {
  voltage: number;      // e.g., 240.1
  current: number;      // e.g., 15.3
  power: number;        // e.g., 3.6
  kwh: number;          // e.g., 28.5 (Daily accumulated)
  pf: number;           // e.g., 0.98
  frequency: number;    // e.g., 60.0
}

// Metrics for solar generation
export interface GenMetrics {
  voltage: number;      // e.g., 250.5
  current: number;      // e.g., 10.1
  power: number;        // e.g., 2.5
  kwh: number;          // e.g., 18.7 (Daily accumulated)
  pf: number;           // e.g., 0.99
  frequency: number;    // e.g., 60.0
}

// For the time-series chart data
export interface TimeSeriesDataPoint {
  time: string; // Or Date
  loadKwh: number;
  genKwh: number;
}

export interface Device {
  name: string;
  icon: any; // Can be more specific, e.g., keyof typeof MaterialCommunityIcons.glyphMap
  power: number; // in Watts
  costPerHour: number;
  percentage: number;
}
