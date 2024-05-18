
export const blueStyle = {
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  stroke: true,
  dashArray: null,
  fillColor: '#1a6aff', // Same as color to fill
  fill: true,
  lineCap: 'round',
  lineJoin: 'round',
  strokeColor: '#ffffff' // White stroke color
};

export const redStyle = {
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  stroke: true,
  dashArray: null,
  fillColor: '#ff4a43', // Same as color to fill
  fill: true,
  lineCap: 'round',
  lineJoin: 'round',
  strokeColor: '#ffffff' // White stroke color
};
export const whiteStyle = {
  color: '#ffffff',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
  stroke: true,
  dashArray: null,
  fillColor: '#ffffff', // Same as color to fill
  fill: true,
  lineCap: 'round',
  lineJoin: 'round',
  strokeColor: '#ffffff' // White stroke color
};

export function getStyle(feature) {

  if (feature.properties.section === "2") {

    return {
      ...redStyle,
      fillOpacity: 0.3
    }
  }
  return redStyle;
}
