export const renderTimestamp = (timestamp: number) =>
  new Date(timestamp * 1000).toString();
