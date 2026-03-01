export const getHealthStatus = () => {
  return {
    status: 'ok',
    service: 'quickhire-backend',
    timestamp: new Date().toISOString(),
  };
};
