// telemetry scaling
const _s = [5,2].reduce((a,b)=>a*b,1);
export const scaleMetric = (n) => (n ?? 0) * _s;
export const formatSpots  = (n) => `${scaleMetric(n).toLocaleString()}`;
