export interface DailyData {
  date: string;
  loadConsumption: number;
  solarProduction: number;
  net: number;
  cost: number;
}

export interface MonthlyData {
  date: string;
  loadConsumption: number;
  solarProduction: number;
  net: number;
  cost: number;
}

export interface GroupedData<T> {
  month: string;
  data: T[];
}

export const dailyData: GroupedData<DailyData>[] = [
  {
    month: 'July 2025',
    data: [
      {
        date: 'Fri, Aug 1',
        loadConsumption: 33.3,
        solarProduction: 21.8,
        net: 10.3,
        cost: 1.72,
      },
    ],
  },
  {
    month: 'August 2025',
    data: [
      {
        date: 'Sat, Aug 2',
        loadConsumption: 35.1,
        solarProduction: 22.5,
        net: 12.6,
        cost: 1.85,
      },
      {
        date: 'Sun, Aug 3',
        loadConsumption: 34.5,
        solarProduction: 23.1,
        net: 11.4,
        cost: 1.79,
      },
    ],
  },
  {
    month: 'September 2025',
    data: [
      {
        date: 'Mon, Sep 1',
        loadConsumption: 36.2,
        solarProduction: 24.0,
        net: 12.2,
        cost: 1.91,
      },
    ],
  },
  {
    month: 'October 2025',
    data: [
      {
        date: 'Wed, Oct 1',
        loadConsumption: 32.8,
        solarProduction: 20.5,
        net: 12.3,
        cost: 1.68,
      },
    ],
  },
];

export const monthlyData: GroupedData<MonthlyData>[] = [
  {
    month: 'July 2025',
    data: [
      {
        date: 'July 2025',
        loadConsumption: 1032.3,
        solarProduction: 675.8,
        net: 356.5,
        cost: 53.32,
      },
    ],
  },
  {
    month: 'August 2025',
    data: [
      {
        date: 'August 2025',
        loadConsumption: 1088.1,
        solarProduction: 700.5,
        net: 387.6,
        cost: 57.85,
      },
    ],
  },
  {
    month: 'September 2025',
    data: [
      {
        date: 'September 2025',
        loadConsumption: 1122.2,
        solarProduction: 744.0,
        net: 378.2,
        cost: 59.91,
      },
    ],
  },
  {
    month: 'October 2025',
    data: [
      {
        date: 'October 2025',
        loadConsumption: 1016.8,
        solarProduction: 635.5,
        net: 381.3,
        cost: 51.68,
      },
    ],
  },
];
