function importImages(r) {
  const images = {};
  r.keys().forEach((element) => {
    element
      .replace(/[^\d_]/g, '')
      .split('_')
      .forEach((id) => {
        images[id] = r(element);
      });
  });
  return images;
}

export const dayIcons = importImages(
  require.context('./assets/icons/day', false, /\.(png|jpe?g|svg)$/),
);
export const nightIcons = importImages(
  require.context('./assets/icons/night', false, /\.(png|jpe?g|svg)$/),
);
