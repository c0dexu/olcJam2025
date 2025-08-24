export function vectorDistance(x1, y1, z1, x2, y2, z2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;
  return [dx, dy, dz];
}

export function distance(x1, y1, z1, x2, y2, z2) {
  const v = vectorDistance(x1, y1, z1, x2, y2, z2);
  const dist = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  return dist;
}

export function normal(x1, y1, z1, x2, y2, z2) {
  const v = vectorDistance(x1, y1, z1, x2, y2, z2);
  const dist = distance(x1, y1, z1, x2, y2, z2);
  const nx = v[0] / dist;
  const ny = v[1] / dist;
  const nz = v[2] / dist;
  return [nx, ny, nz];
}
