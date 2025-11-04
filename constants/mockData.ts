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
    month: 'January 2025',
    data: [
      {
        date: 'Wed, Jan 1',
        loadConsumption: 47.2,
        solarProduction: 7.8,
        net: 39.4,
        cost: 2.46,
      },
      {
        date: 'Thu, Jan 2',
        loadConsumption: 46.8,
        solarProduction: 7.4,
        net: 39.4,
        cost: 2.44,
      },
    ],
  },
  {
    month: 'February 2025',
    data: [
      {
        date: 'Sat, Feb 1',
        loadConsumption: 42.5,
        solarProduction: 10.9,
        net: 31.6,
        cost: 2.21,
      },
      {
        date: 'Sun, Feb 2',
        loadConsumption: 41.9,
        solarProduction: 10.7,
        net: 31.2,
        cost: 2.18,
      },
    ],
  },
  {
    month: 'March 2025',
    data: [
      {
        date: 'Sat, Mar 1',
        loadConsumption: 38.2,
        solarProduction: 14.8,
        net: 23.4,
        cost: 1.99,
      },
      {
        date: 'Sun, Mar 2',
        loadConsumption: 37.8,
        solarProduction: 14.6,
        net: 23.2,
        cost: 1.97,
      },
    ],
  },
  {
    month: 'April 2025',
    data: [
      {
        date: 'Tue, Apr 1',
        loadConsumption: 31.8,
        solarProduction: 20.1,
        net: 11.7,
        cost: 1.66,
      },
      {
        date: 'Wed, Apr 2',
        loadConsumption: 31.5,
        solarProduction: 20.3,
        net: 11.2,
        cost: 1.64,
      },
    ],
  },
  {
    month: 'May 2025',
    data: [
      {
        date: 'Thu, May 1',
        loadConsumption: 28.3,
        solarProduction: 24.1,
        net: 4.2,
        cost: 1.47,
      },
      {
        date: 'Fri, May 2',
        loadConsumption: 28.1,
        solarProduction: 24.3,
        net: 3.8,
        cost: 1.46,
      },
    ],
  },
  {
    month: 'June 2025',
    data: [
      {
        date: 'Sun, Jun 1',
        loadConsumption: 29.8,
        solarProduction: 25.5,
        net: 4.3,
        cost: 1.55,
      },
      {
        date: 'Mon, Jun 2',
        loadConsumption: 29.6,
        solarProduction: 25.7,
        net: 3.9,
        cost: 1.54,
      },
    ],
  },
  {
    month: 'July 2025',
    data: [
      {
        date: 'Sat, Jul 2',
        loadConsumption: 34.0,
        solarProduction: 22.2,
        net: 11.8,
        cost: 1.77,
      },
      {
        date: 'Sun, Jul 3',
        loadConsumption: 33.8,
        solarProduction: 22.0,
        net: 11.8,
        cost: 1.76,
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
      {
        date: 'Mon, Aug 4',
        loadConsumption: 35.5,
        solarProduction: 22.8,
        net: 12.7,
        cost: 1.85,
      },
      {
        date: 'Tue, Aug 5',
        loadConsumption: 34.8,
        solarProduction: 23.2,
        net: 11.6,
        cost: 1.81,
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
      {
        date: 'Tue, Sep 2',
        loadConsumption: 36.5,
        solarProduction: 24.3,
        net: 12.2,
        cost: 1.90,
      },
      {
        date: 'Wed, Sep 3',
        loadConsumption: 35.9,
        solarProduction: 23.8,
        net: 12.1,
        cost: 1.87,
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
      {
        date: 'Thu, Oct 2',
        loadConsumption: 33.1,
        solarProduction: 20.7,
        net: 12.4,
        cost: 1.72,
      },
      {
        date: 'Fri, Oct 3',
        loadConsumption: 32.5,
        solarProduction: 20.3,
        net: 12.2,
        cost: 1.69,
      },
    ],
  },
  {
    month: 'November 2025',
    data: [
      {
        date: 'Sat, Nov 1',
        loadConsumption: 39.5,
        solarProduction: 13.7,
        net: 25.8,
        cost: 2.06,
      },
      {
        date: 'Sun, Nov 2',
        loadConsumption: 39.2,
        solarProduction: 13.5,
        net: 25.7,
        cost: 2.04,
      },
    ],
  },
  {
    month: 'December 2025',
    data: [
      {
        date: 'Mon, Dec 1',
        loadConsumption: 50.6,
        solarProduction: 6.4,
        net: 44.2,
        cost: 2.63,
      },
      {
        date: 'Tue, Dec 2',
        loadConsumption: 50.2,
        solarProduction: 6.2,
        net: 44.0,
        cost: 2.61,
      },
    ],
  },
];

export const monthlyData: GroupedData<MonthlyData>[] = [
  {
    month: 'January 2025',
    data: [
      {
        date: 'January 2025',
        loadConsumption: 1456.7,
        solarProduction: 234.1,
        net: 1222.6,
        cost: 74.83,
      },
    ],
  },
  {
    month: 'February 2025',
    data: [
      {
        date: 'February 2025',
        loadConsumption: 1324.5,
        solarProduction: 312.8,
        net: 1011.7,
        cost: 68.24,
      },
    ],
  },
  {
    month: 'March 2025',
    data: [
      {
        date: 'March 2025',
        loadConsumption: 1189.3,
        solarProduction: 456.2,
        net: 733.1,
        cost: 61.46,
      },
    ],
  },
  {
    month: 'April 2025',
    data: [
      {
        date: 'April 2025',
        loadConsumption: 987.6,
        solarProduction: 623.4,
        net: 364.2,
        cost: 50.92,
      },
    ],
  },
  {
    month: 'May 2025',
    data: [
      {
        date: 'May 2025',
        loadConsumption: 876.4,
        solarProduction: 745.8,
        net: 130.6,
        cost: 45.08,
      },
    ],
  },
  {
    month: 'June 2025',
    data: [
      {
        date: 'June 2025',
        loadConsumption: 923.1,
        solarProduction: 789.3,
        net: 133.8,
        cost: 47.56,
      },
    ],
  },
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
  {
    month: 'November 2025',
    data: [
      {
        date: 'November 2025',
        loadConsumption: 599.9,
        solarProduction: 423.7,
        net: 811.2,
        cost: 63.74,
      },
    ],
  },
  {
    month: 'December 2025',
    data: [
      {
        date: 'December 2025',
        loadConsumption: 1567.8,
        solarProduction: 198.4,
        net: 1369.4,
        cost: 80.91,
      },
    ],
  },
];
