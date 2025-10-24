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
};

export default awsConfig;
