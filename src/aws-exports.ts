const awsConfig = {
  Auth: {
    Cognito: {
      identityPoolId: 'ap-south-1:90144f2c-07c9-45ca-b03f-e69e2392d2ae',
      region: 'ap-south-1',
      userPoolId: 'ap-south-1_UdNGuQ50P',
      userPoolClientId: '62veg3gigav1a6v610orlah985',
      allowGuestAccess: true, // ← CRITICAL: Enable guest/unauthenticated access
    },
  },
  deviceId: 'ENSN001',
};

export const API_CONFIG = {
  BASE_URL: 'https://hqq0fr63d6.execute-api.ap-south-1.amazonaws.com/prodv1',
  ENDPOINTS: {
    HOME: '/home',
    LIVE: '/live',
    HISTORICAL_DAILY: '/historical/daily',
    HISTORICAL_MONTHLY: '/historical/monthly'
  },
  REFRESH_INTERVALS: {
    LIVE: 30,
    HOME: 3600,
    HISTORICAL: 30000
  }
};

export default awsConfig;
