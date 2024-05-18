import * as turf from '@turf/turf';

export function getPolygonCenter(coords) {


  const polygon = turf.polygon([coords]);

  // Calculate the centroid of the polygon
  const centroid = turf.centroid(polygon);

  // Extract the coordinates of the centroid
  const [x, y] = centroid.geometry.coordinates;

  return [y, x]; // Return coordinates in [latitude, longitude] format for Leaflet
}
