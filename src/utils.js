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

export function dot(x1, y1, z1, x2, y2, z2) {
  return x1 * x2 + y1 * y2 + z1 * z2;
}

export function magnitude(x, y, z) {
  return distance(0, 0, 0, x, y, z);
}

export function cartesian_to_spherical(x, y, z) {
  const dist = magnitude(x, y, z);
  const theta = Math.atan2(y, x);

  const k2 = z / dist;
  const phi = Math.acos(k2);
  return [dist, theta, phi];
}

export function units_sphere(theta, phi) {
  const u1 = [-Math.sin(theta), Math.cos(theta), 0];

  const u2 = [
    Math.cos(theta) * Math.cos(phi),
    Math.sin(theta) * Math.cos(phi),
    -Math.sin(phi),
  ];

  return { u1, u2 };
}
