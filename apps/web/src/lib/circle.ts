export const transform = (index: number, components: number, radius = 500) => {
  const angle = (index / components) * 2 * Math.PI;

  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return { x, y, rotation: index * (360 / components) - 90 };
};
