export function distance(x1, y1, z1, x2, y2, z2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;
  const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
  return dist;
}
